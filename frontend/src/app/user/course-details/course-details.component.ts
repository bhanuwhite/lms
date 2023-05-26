import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ratingObj, QAcategory } from '../../interface';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { UserLibraryGetResponseData } from 'src/app/models/user-library';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
  streamVideo!: { url: string; name: string };
  duration!: number;
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
  timeConsumedByUser:number = 0;
  @ViewChild('Course_video') Course_video: any;

  constructor(
    public apiService: ApiService,
    public activeParam: ActivatedRoute,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.activeParams();
    this.getLibraryData();
    this.getLocalStoredData();
    this.gettingTrack();
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

  public getLibraryData() {
    this.apiService
      .getSingleContentLibrary(this.activeParamId)
      .subscribe((res) => {
        console.log("1st console, course Res",res);
        this.Spinner = false;
        this.userCourseData = res.data;
        this.courseId = this.userCourseData.attributes.course_content.data.id;
        console.log("2nd console courseID",this.courseId);
        this.defaultVideo();
      });
  }

  public gettingTrack() {
    this.apiService.getTrack().subscribe((res) => {
      console.log('3rd Track   RESPONCE ', res);
      this.trackResponse = res.data;
      console.log('4th res data', this.trackResponse);
      this.trackResponse.map((res: any) => {
        console.log(' 5th Res OBJECT', res);
        console.log("5.5 courseID",Number(res.attributes.course_id));
        this.timeConsumedByUser = Math.trunc(res.attributes.time_consumed);
        this.trackCourseIds?.push(Number(res.attributes.course_id));
      });
      console.log(this.trackCourseIds, '6th TRacking IDS');
      this.postTrackMethod();

    });
  }

  public postTrackMethod() {
    const postData = {
      data: {
        user_id: this.globalUserId,
        course_id: this.courseId,
        total_duration: 0,
        time_consumed: 0,
      },
    };
    console.log(" 7th Posting Data",postData);


    if (!this.trackCourseIds.includes(this.courseId)) {
      console.log(" 8th this course will add");

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
    }
    else{
      console.log(" Mahesh course already in TRACK");

      this.messageService.add({
        severity: 'error',
        summary: 'Mahesh',
        detail: 'This course already in TRACK API',
      });
    }
  }

  userWatchedTotalTime: number = 0;
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
        time_consumed: Math.trunc(this.userWatchedTime) + this.timeConsumedByUser,
      }
    };
    console.log(putTrackData);

setTimeout(() => {
  this.apiService.putTrack(putTrackData).subscribe((res)=>{
    console.log("Updated Track API", res);
  })
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
