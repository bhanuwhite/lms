import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ratingObj, QAcategory } from '../../interface';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { UserLibraryGetResponseData } from 'src/app/models/user-library';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
  streamVideo!: { url: string; name: string };
  totalDurationVideo: number = 0;
  duration!: number;
  public userCourseData: any;
  public Spinner: boolean = true;
  @ViewChild('Course_video') Course_video:any;

  constructor(
    public apiService: ApiService,
    public activeParam: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeParams();
    this.getLibraryData();
  }

  // Editing with API data
  activeParamId!: number;
  public activeParams() {
    this.activeParam.params.subscribe((res) => {
      this.activeParamId = res['id'];
    });
  }

  public getLibraryData() {
    this.apiService
      .getSingleContentLibrary(this.activeParamId)
      .subscribe((res) => {
        this.Spinner = false;
        this.userCourseData = res.data;
        console.log(this.userCourseData);

        this.defaultVideo();
      });
  }

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

  // getting Video Duration
  onMetadata(video: any) {
    // console.log('duration: ', Math.trunc(video.duration));
    this.totalDurationVideo = this.totalDurationVideo + video.duration;
    // console.log(this.totalDurationVideo);
  }
  // get running time of video.
  getWatchedTime(videoData: any) {
    const timeDuration = this.Course_video.nativeElement.currentTime;
    console.log('User played the video, Duration', timeDuration);
  }

  // End
}
