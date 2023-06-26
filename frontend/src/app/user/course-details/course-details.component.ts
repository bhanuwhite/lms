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
  // PostMethodTrack$: Subscription = new Subscription();
  // TrackPutMethod$: Subscription = new Subscription();
  PutUserHasCourse$: Subscription = new Subscription();

  public userID!: number;
  public courseId!: number;
  public trackingId: number = 0;
  public totalDurationVideo: any = 0;
  userWatchedTime: number = 1;
  timeConsumedByUser: number = 0;
  watchedDurations: { name: string; duration: number }[] = [];
  timeArray: number[] = [];
  putId!: number;
  accordianTabIndex: number = -1;
  putLibId!: number;
  @ViewChild('Course_video') Course_video!: ElementRef;

  constructor(
    public apiService: ApiService,
    public activeParam: ActivatedRoute,
    public messageService: MessageService
  ) {}
  ngOnInit() {
    this.activeParams();
    this.getLocalStoredData();
    this.getLibraryData();
    this.gettingUserHasCourse()
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
          this.putId = this.userCourseData.attributes.course_ids.data[0].id;
          this.courseId = this.userCourseData.id;
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
        res.map((resData:any)=>{
          this.libDataIds.push(resData.course_ids[0]?.id)
        })
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
      .subscribe((res) => {
      });
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

  ngOnDestroy(): void {
    this.LibraryContent$.unsubscribe();
    this.SingleContentLib$.unsubscribe();
  }

  // End
}
