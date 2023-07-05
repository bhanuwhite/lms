import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TrackResponseData } from 'src/app/models/track';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit, OnDestroy {
  streamVideo!: { url: string; name: string };
  public userCourseData: any;
  public Spinner: boolean = true;
  activeParamId!: number;
  trackResponse: TrackResponseData[] = [];
  trackCourseIds: number[] = [];
  SingleContentLib$: Subscription = new Subscription();
  LibraryContent$: Subscription = new Subscription();
  PutUserHasCourse$: Subscription = new Subscription();

  public userID!: number;
  public courseId!: number;
  public trackingId: number = 0;
  public totalDurationVideo: any = 0;
  userWatchedTime: number = 1;
  timeConsumedByUser: number = 0;
  watchedDurations: { name: string; duration: number }[] = [];
  timeArray: number[] = [];
  course_id!: number;
  accordianTabIndex: number = -1;
  putLibId!: number;
  progressPercentage!: any
  @ViewChild('Course_video') Course_video!: ElementRef;

  constructor(
    public apiService: ApiService,
    public activeParam: ActivatedRoute,
    public messageService: MessageService
  ) {}
  ngOnInit() {
    this.activeParams();
    this.getLocalStoredData();
    this.gettingUserHasCourse();
    this.getLibraryData().then(() => this.getRating());

    this.getContent();
    // this.getWatchedTime()
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
          this.courseId = this.userCourseData.id;
          // console.log(this.userCourseData.attributes.progress_percentage);

          this.progressPercentage = this.userCourseData.attributes.progress_percentage
          this.defaultVideo();
          resolve();
        })),
        (error: any) => {
          reject(error);
        };
    });
  }

  libDataIds: number[] = [];
  public gettingUserHasCourse(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiService.getUserCourse(this.userID).subscribe((res) => {
        res.map((resData: any) => {
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

      this.progressPercentage =  progressPer.toFixed(0)
      console.log(this.progressPercentage);

  }

  // Displaying Default video 1st
  public defaultVideo() {
    this.streamVideo = {
      url: this.userCourseData?.attributes?.course_ids.data[0]?.attributes
        .content.data[0]?.attributes?.url,
      name: this.userCourseData?.attributes?.course_ids.data[0]?.attributes
        .content.data[0]?.attributes?.name,
    };
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

  CourseRating_UserIds: any[] = [];

  getRating() {
    this.apiService.getUserRatings(this.course_id).subscribe((res: any) => {
      for (let i = 0; i < res.length; i++) {
        this.CourseRating_UserIds.push(JSON.parse(res[i].user_id));
      }
    });
  }

  visible: boolean = false;
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

  // updateRating(updatedRating: number) {
  //   const updatedRatingBody = {
  //     data: {
  //       course_id: this.course_id,
  //       user_id: this.userID,
  //       rating: updatedRating,
  //     },
  //   };

  //   this.apiService
  //     .upadateUserRatings(this.userID, updatedRatingBody)
  //     .subscribe((res: any) => {});

  //   this.visible = false;
  // }

  contentData: any;
  totalAvgRating: number | null = 0;
  sum: number = 0;
  ratingData: any;

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

  ngOnDestroy(): void {
    this.LibraryContent$.unsubscribe();
    this.SingleContentLib$.unsubscribe();
  }

  // End
}
