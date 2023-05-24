import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from 'primeng/dynamicdialog';
import { VideoPopupComponent } from '../video-popup/video-popup.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
// import { ContentResponse } from 'src/app/models/content';
import { MessageService,ConfirmationService,ConfirmEventType } from 'primeng/api';
import { Content,ContentData, ContentLibrary, ContentResponse,SingleContentData,mediaDataObj,userLibrary } from 'src/app/models/content';

@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.scss'],
  providers: [DialogService,MessageService,ConfirmationService],
})
export class ContentDetailsComponent implements OnInit {
  public displayDialog = false;
  public courseId!: number;
  public singleCourse!: ContentResponse;

  ngOnInit(): void {
    this.getSingleCourseObj();
    this.getUserLibrary()
  }

  constructor(
    public dialogService: DialogService,
    private activeParams: ActivatedRoute,
    private apiService: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,

  ) {}

  public getSingleCourseObj() {

    this.activeParams.params.subscribe((res) => {
      this.courseId = res['id'];
    });
    this.apiService.getSingleContent(this.courseId).subscribe((res) => {
      this.singleCourse = res.data;
    });
  }

  addToLibrary(course: ContentResponse) {
    this.confirmationService.confirm({
      message: 'Do you want to add this course to Library?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const courseDetails: ContentLibrary = {
          data:
            {
                course_id: 1,
                user_id: 2,
                content_library : course.id
              },
        };

        this.apiService.postContentLibrary(courseDetails).subscribe((res) => {
              console.log(res);
              this.getUserLibrary()

        })
        this.messageService.add({
          severity: 'success',
          summary: 'Successfully',
          detail: 'Course added to library',
        });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
            })
  }



  public coursesId: number[]=[];
  // libraryContent:any

  public getUserLibrary() {

    this.apiService.getContentLibrary().subscribe((res) => {
      const libraryContent = res.data;
      console.log(res.data);

      libraryContent.some((obj:any) =>{
        this.coursesId.push(obj.attributes.content_library.data.id);
        console.log(this.coursesId);


      })

    })

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
