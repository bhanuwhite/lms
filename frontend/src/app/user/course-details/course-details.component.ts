import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ratingObj, QAcategory } from '../../interface';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { UserLibraryGetResponseData } from 'src/app/models/user-library';
import { MessageService } from 'primeng/api';
import { resolve } from 'chart.js/dist/helpers/helpers.options';
@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
  streamVideo!: { url: string; name: string };
  public userCourseData: any;
  public Spinner: boolean = true;
  activeParamId!: number;
  trackResponse: any[] = [];
  trackCourseIds: number[] = [];

  public globalUserId!: number;
  public courseId!: number;
  public trackingId: number = 0;
  public totalDurationVideo: number = 0;
  userWatchedTime: number = 1;
  timeConsumedByUser: number = 0;
  @ViewChild('Course_video') Course_video: any;

  constructor(
    public apiService: ApiService,
    public activeParam: ActivatedRoute,
    public messageService: MessageService
  ) {}

  ngOnInit() {
    this.activeParams();
    this.getLocalStoredData();
    // Below seconda function will execute after the 1st get completed.
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

  public getLibraryData(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiService
        .getSingleContentLibrary(this.activeParamId)
        .subscribe((res) => {
          this.Spinner = false;
          this.userCourseData = res.data;
          this.courseId = this.userCourseData.attributes.course_content.data.id;
          this.defaultVideo();
          resolve();
        }),
        (error: any) => {
          reject(error);
        };
    });
  }

  public gettingTrack(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiService.getTrack().subscribe((res) => {
        this.trackResponse = res.data;
        this.trackResponse.map((res: any) => {
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
            total_duration: 0,
            time_consumed: 0,
          },
        };
        if (!this.trackCourseIds.includes(this.courseId)) {
          this.apiService.postTrack(postData).subscribe((res) => {
            try {
              this.messageService.add({
                severity: 'success',
                summary: 'success',
                detail: 'Data posted on Tracking',
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
          this.messageService.add({
            severity: 'error',
            summary: 'Alert',
            detail: 'This course already in TRACK API',
          });
        }
      } else {
        this.messageService.add({
          severity: 'error',
          detail: 'course Id is null check',
        });
      }
      (error:any)=>{
        reject(error)
      }
    });
  }

  // getting Video Duration
  onMetadata(video: any) {
    this.totalDurationVideo = this.totalDurationVideo + video.duration;
  }
  // get running time of video.
  getWatchedTime(videoData: any) {
    this.userWatchedTime = this.Course_video.nativeElement.currentTime;
    console.log('time duration', this.userWatchedTime);

    const putTrackData = {
      data: {
        total_duration: Math.trunc(this.totalDurationVideo),
        time_consumed:
          Math.trunc(this.userWatchedTime) + this.timeConsumedByUser,
      },
    };
    console.log(putTrackData);

    setTimeout(() => {
      this.apiService.putTrack(putTrackData).subscribe((res) => {
        console.log('Updated Track API', res);
      });
    }, 5000);
  }

  // Displaying Default video 1st
  public defaultVideo() {
    this.streamVideo = {
      url: this.userCourseData?.attributes?.course_content.data?.attributes
        .content.data[0].attributes?.url,
      name: this.userCourseData?.attributes?.course_content.data?.attributes
        .content.data[0].attributes?.name,
    };
  }

  // click to play a specific video in a course
  public playVideo(index: number) {
    this.streamVideo =
      this.userCourseData?.attributes?.course_content.data?.attributes.content.data[
        index
      ].attributes;
  }

  // End
}
