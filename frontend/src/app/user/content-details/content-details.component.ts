import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from 'primeng/dynamicdialog';
import { VideoPopupComponent } from '../video-popup/video-popup.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ContentResponse } from 'src/app/models/content';

@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.scss'],
  providers: [DialogService],
})
export class ContentDetailsComponent implements OnInit {
  public displayDialog = false;
  public courseId!: number;
  public singleCourse!: ContentResponse;

  ngOnInit(): void {
    this.getSingleCourseObj();
  }

  constructor(
    public dialogService: DialogService,
    private activeParams: ActivatedRoute,
    private apiService: ApiService
  ) {}

  public getSingleCourseObj() {
    this.activeParams.params.subscribe((res) => {
      this.courseId = res['id'];
    });
    this.apiService.getSingleContent(this.courseId).subscribe((res) => {
      this.singleCourse = res.data;
    });
  }

  onClickVideo(courseDetails: {}) {
    // this.displayDialog = true;
    console.log(courseDetails);
    const ref = this.dialogService.open(VideoPopupComponent, {
      header: 'Course Preview',
      width: '50%',
      data: { name: 'John' },
    });
  }
  onClose() {
    this.displayDialog = false;
  }
}
