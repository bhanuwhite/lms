import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ratingObj, QAcategory } from '../../interface';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { UserLibraryGetResponseData } from 'src/app/models/user-library';
import { MessageService } from 'primeng/api';
import { resolve } from 'chart.js/dist/helpers/helpers.options';
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
  PostMethodTrack$: Subscription = new Subscription();
  TrackPutMethod$: Subscription = new Subscription();

  public globalUserId!: number;
  public courseId!: number;
  public trackingId: number = 0;
  public totalDurationVideo: number = 0;
  userWatchedTime: number = 1;
  timeConsumedByUser: number = 0;
  watchedDurations: { name: string; duration: number }[] = [];
  timeArray: number[] = [];
  putId!: number;
  accordianTabIndex:number = -1;

  @ViewChild('Course_video') Course_video!: ElementRef;

  constructor(
    public apiService: ApiService,
    public activeParam: ActivatedRoute,
    public messageService: MessageService
  ) {}
  ngOnInit() {
    this.activeParams();
    this.getLocalStoredData();
    // Below secound function will execute after the 1st get completed.
    this.getLibraryData()
      .then(() => this.gettingTrack())
      .then(() => this.postTrackMethod())
      .catch((error) => {
        console.log(error);
      });
  }

  // Editing with API data

  public activeParams() {
    this.activeParam.params.subscribe((res) => {
      this.activeParamId = res['id'];
    });
  }

  public getLocalStoredData() {
    const localStoredData = JSON.parse(localStorage.getItem('user')!);
    this.globalUserId = localStoredData.id;
  }

  putLibId!: number;
  public getLibraryData(): Promise<void> {
    return new Promise((resolve, reject) => {
      (this.SingleContentLib$ = this.apiService
        .getSingleContentLibrary(this.activeParamId)
        .subscribe((res) => {
          console.log(res);
          this.Spinner = false;
          this.userCourseData = res.data;
          console.log(this.userCourseData);

          this.putLibId = this.userCourseData.id;

          this.courseId = this.userCourseData.attributes.course_content.data.id;
          this.defaultVideo();
          resolve();
        })),
        (error: any) => {
          reject(error);
        };
    });
  }

  public gettingTrack(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiService.getTrack().subscribe((res) => {
        this.trackResponse = res.data;

        this.trackResponse.map((res: TrackResponseData) => {
          this.timeConsumedByUser = Math.trunc(res.attributes.time_consumed);
          this.trackCourseIds?.push(Number(res.attributes.course_id));
        });
        resolve();
      }),
        (error: any) => {
          reject(error);
        };
    });
  }

  public postTrackMethod(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.courseId) {
        const postData = {
          data: {
            user_id: this.globalUserId,
            course_id: this.courseId,
            time_consumed: 0,
            total_duration: 0,
          },
        };
        if (!this.trackCourseIds.includes(this.courseId)) {
          this.PostMethodTrack$ = this.apiService
            .postTrack(postData)
            .subscribe((res) => {
              try {
                this.trackResponse.map((res: TrackResponseData) => {
                  if (res.attributes.course_id == this.courseId) {
                    this.putId = res.id;
                  }
                });
              } catch (error) {
                console.log(error);
                this.messageService.add({
                  severity: 'error',
                  summary: 'Failed',
                  detail: 'Post failed',
                });
              }
            });
          resolve();
        } else {
          this.trackResponse.map((res: TrackResponseData) => {
            if (res.attributes.course_id == this.courseId) {
              this.putId = res.id;
            }
          });
        }
      } else {
        this.messageService.add({
          severity: 'error',
          detail: 'course Id is null check',
        });
      }
      (error: any) => {
        reject(error);
      };
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
    // update with the following data
    const putTrackData = {
      data: {
        total_duration: Math.trunc(this.totalDurationVideo),
        time_consumed: Math.trunc(totalConsumedTime),
      },
    };

    if (this.putId) {
      this.TrackPutMethod$ = this.apiService
        .putTrack(this.putId, putTrackData)
        .subscribe((res) => {});

      const putLibData = {
        data: {
          progress_percentage: Math.trunc(
            (totalConsumedTime / this.totalDurationVideo) * 100
          ),
        },
      };

      this.LibraryContent$ = this.apiService
        .putLibraryData(this.putLibId, putLibData)
        .subscribe((res) => {
          console.log(res);
        });
    } else {
      this.messageService.add({
        severity: 'error',
        detail: 'Please refresh the page once',
      });
    }
  }

  // Displaying Default video 1st
  public defaultVideo() {
    this.streamVideo = {
      url: this.userCourseData?.attributes?.course_content.data?.attributes
        .content.data[0]?.attributes?.url,
      name: this.userCourseData?.attributes?.course_content.data?.attributes
        .content.data[0]?.attributes?.name,
    };
  }

  // click to play a specific video in a course
  public playVideo(index: number) {
    this.streamVideo =
      this.userCourseData?.attributes?.course_content.data?.attributes.content.data[
        index
      ].attributes;

      window.scrollTo(0,0)
  }

  public toggleAccordian(index:number):void{
    if(this.accordianTabIndex === index){
      this.accordianTabIndex = -1;
    }
    else {
      this.accordianTabIndex = index
    }

  }

  ngOnDestroy(): void {
    this.LibraryContent$.unsubscribe();
    this.PostMethodTrack$.unsubscribe();
    this.TrackPutMethod$.unsubscribe();
    this.SingleContentLib$.unsubscribe();
  }

  // End
}
