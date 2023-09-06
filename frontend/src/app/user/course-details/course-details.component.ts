import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { environment } from 'src/environment/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AboutService } from 'src/app/services/about.service';
import { CourseData } from 'src/app/models/library';
@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit, OnDestroy {
  streamVideo!: { url: string; name: string };
  public userCourseData: any;
  public Spinner: boolean = true;
  private activeParamId!: number;
  private SingleContentLib$: Subscription = new Subscription();
  private LibraryContent$: Subscription = new Subscription();
  private PutUserHasCourse$: Subscription = new Subscription();
  public userID!: number;
  public courseId!: number;
  public trackingId: number = 0;
  public totalDurationVideo: any = 0;
  public userWatchedTime: number = 1;
  public timeConsumedByUser: number = 0;
  public watchedDurations: { name: string; duration: number }[] = [];
  public timeArray: number[] = [];
  public course_id!: number;
  public accordianTabIndex: number = -1;
  public putLibId!: number;
  public progressPercentage!: any;
  public libDataIds: number[] = [];
  public videoUrl!: SafeResourceUrl;
  public singleCourse!: any;
  public contentData: any;
  public totalAvgRating: number | null = 0;
  public sum: number = 0;
  public ratingData: any;
  public img_url = environment.apiUrl;
  private courseCount!: number;
  private videoCount: boolean = true;
  visible: boolean = false;
  CourseRating_UserIds: number[] = [];
  private courseVideoCount$: Subscription = new Subscription();

  @ViewChild('Course_video') Course_video!: ElementRef;

  constructor(
    public apiService: ApiService,
    public activeParam: ActivatedRoute,
    public messageService: MessageService,
    private sanitizer: DomSanitizer,
    private aboutService: AboutService
  ) {}
  ngOnInit() {
    this.activeParams();
    this.getLocalStoredData();
    this.getSingleCourseObj();
    this.gettingUserHasCourse();
    this.getLibraryData().then(() => this.getRating());
    this.getContent();
  }

  public activeParams() {
    this.activeParam.params.subscribe((res) => {
      this.activeParamId = res['id'];
    });
  }

  public getLocalStoredData() {
    const localStoredData = JSON.parse(localStorage.getItem('user')!);
    this.userID = localStoredData.id;
  }

  public getLibraryData(): Promise<void> {
    return new Promise((resolve, reject) => {
      (this.SingleContentLib$ = this.apiService
        .getUserHasCourseById(this.activeParamId)
        .subscribe((res) => {
          this.Spinner = false;
          this.userCourseData = res.data;
          this.course_id = this.userCourseData.attributes.course_ids.data[0].id;
          this.courseCount =
            this.userCourseData.attributes.course_ids.data[0].attributes
              .video_name ?? 0;
          this.courseId = this.userCourseData.id;
          this.progressPercentage =
            this.userCourseData.attributes.progress_percentage;
          this.defaultVideo();
          resolve();
        })),
        (error: any) => {
          reject(error);
        };
    });
  }

  public gettingUserHasCourse(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiService.getUserCourse(this.userID).subscribe((res) => {
        res.map((resData: CourseData) => {
          this.libDataIds.push(resData.course_ids[0]?.id);
        });
        resolve(),
          (err: any) => {
            reject(err);
          };
      });
    });
  }

  // getting Video Duration
  onMetadata(video: HTMLVideoElement) {
    this.totalDurationVideo = this.totalDurationVideo + video.duration;
  }

  // get running time of video.
  getWatchedTime() {
    this.userWatchedTime = this.Course_video.nativeElement.currentTime;
    const videoIndex = this.watchedDurations.findIndex(
      (video: { name: string }) => video.name === this.streamVideo.name
    );
    if (videoIndex === -1) {
      this.watchedDurations.push({
        name: this.streamVideo.name,
        duration: Math.trunc(this.userWatchedTime),
      });
    } else {
      this.watchedDurations[videoIndex].duration = Math.trunc(
        this.userWatchedTime
      );
    }
    this.timeArray = this.watchedDurations.map((resObj) => resObj.duration);
    const totalConsumedTime = this.timeArray.reduce(
      (val1, val2) => val1 + val2
    );
    const progressPer =
      (totalConsumedTime / this.totalDurationVideo.toFixed(0)) * 100;
    const putBody = {
      data: {
        time_consumed: totalConsumedTime,
        total_duration: this.totalDurationVideo.toFixed(0),
        progress_percentage: progressPer.toFixed(0),
      },
    };
    this.PutUserHasCourse$ = this.apiService
      .putUserHasCourse(this.courseId, putBody)
      .subscribe((res) => {});
    this.progressPercentage = progressPer.toFixed(0);
    this.aboutService.watchCourseCount(Number(this.progressPercentage));
    this.courseVideoCount$ = this.aboutService.watchCount$.subscribe((res) => {
      if (res >= 10 && this.videoCount) {
        const count = Number(this.courseCount) + Number(1);
        const updateVideoCount = {
          data: {
            video_name: String(count),
          },
        };
        this.apiService
          .updateContent(this.course_id, updateVideoCount)
          .subscribe((res) => {
            this.videoCount = false;
            try {
            } catch (err) {
              console.log(err);
            }
          });
      }
    });
  }

  // Displaying Default video 1st
  public defaultVideo() {
    if (
      this.userCourseData.attributes.course_ids.data[0].attributes.content
        .data != null
    ) {
      this.streamVideo = {
        url: this.userCourseData.attributes.course_ids.data[0].attributes
          .content.data[0].attributes.url,
        name: this.userCourseData.attributes.course_ids.data[0].attributes
          .content.data[0].attributes.name,
      };
    }
  }

  // click to play a specific video in a course
  public playVideo(index: number) {
    this.streamVideo =
      this.userCourseData?.attributes?.course_ids.data[0]?.attributes.content.data[
        index
      ].attributes;
    window.scrollTo(0, 0);
  }

  public toggleAccordian(index: number): void {
    if (this.accordianTabIndex === index) {
      this.accordianTabIndex = -1;
    } else {
      this.accordianTabIndex = index;
    }
  }

  getRating() {
    this.apiService.getUserRatings(this.course_id).subscribe((res: any) => {
      for (let i = 0; i < res.length; i++) {
        this.CourseRating_UserIds.push(JSON.parse(res[i].user_id));
      }
    });
  }

  showDialog() {
    this.visible = true;
  }

  userRating(rating: number) {
    this.visible = false;
    const ratingBody = {
      data: {
        course_id: this.course_id,
        user_id: this.userID,
        rating: rating,
      },
    };

    this.apiService.postUserRatings(ratingBody).subscribe((res: any) => {
      this.getContent();
      this.getRating();
    });
  }

  public getContent(): void {
    this.apiService.getContent().subscribe((res) => {
      try {
        this.contentData = res.data;
        for (let i = 0; i < this.contentData.length; i++) {
          this.apiService
            .getUserRatings(this.contentData[i].id)
            .subscribe((res: any) => {
              for (let j = 0; j < res.length; j++) {
                this.sum = res[j].rating + this.sum;
              }
              this.totalAvgRating = this.sum / res.length;
              if (
                isNaN(this.totalAvgRating) ||
                this.totalAvgRating === Infinity ||
                this.totalAvgRating === -Infinity
              ) {
                this.totalAvgRating = null;
              }
              this.ratingData = {
                data: {
                  rating: this.totalAvgRating?.toFixed(0),
                },
              };
              this.apiService
                .updateContent(this.contentData[i].id, this.ratingData)
                .subscribe((res) => {});
              this.sum = 0;
            });
        }
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error !!',
          detail: 'Something went wrong !!',
        });
      }
    });
  }

  public getSingleCourseObj(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.apiService
        .getUserHasCourseById(this.activeParamId)
        .subscribe((res) => {
          this.singleCourse = res.data.attributes?.course_ids?.data[0]!;
          this.videoUrl = this.getSafeVideoUrl(
            this.singleCourse.attributes.link
          );
        });
      resolve();
      (error: any) => {
        reject(error);
      };
    });
  }

  getSafeVideoUrl(link: string): SafeResourceUrl {
    const videoId = this.extractVideoId(link);
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
  extractVideoId(link: string): string {
    const regex =
      /youtu(?:\.be|be\.com)\/(?:.*v(?:\/|=)|(?:.*\/)?)([a-zA-Z0-9-_]+)/;
    const match = link?.match(regex);
    return match ? match[1] : '';
  }

  ngOnDestroy(): void {
    this.LibraryContent$.unsubscribe();
    this.SingleContentLib$.unsubscribe();
    this.courseVideoCount$.unsubscribe();
    this.courseVideoCount$.unsubscribe();
  }
}
