import {
  Component,
  OnInit,
  TemplateRef,
  DoCheck,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from 'primeng/dynamicdialog';
import { VideoPopupComponent } from '../video-popup/video-popup.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
// import { ContentResponse } from 'src/app/models/content';
import {
  MessageService,
  ConfirmationService,
  ConfirmEventType,
} from 'primeng/api';
import {
  AllCourseContentData,
  Content,
  ContentData,
  ContentLibrary,
  ContentResponse,
  SingleContentData,
  mediaDataObj,
  userLibrary,
} from 'src/app/models/content';

@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService],
})
export class ContentDetailsComponent implements OnInit {
  public displayDialog = false;
  public courseId!: number;
  public userID!:number;
  public singleCourse!: AllCourseContentData;
  UserCourseArr: any[]= []

  constructor(
    public dialogService: DialogService,
    private activeParams: ActivatedRoute,
    private apiService: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getLocal();
    this.getSingleCourseObj();
    // this.getUserLibrary();
    this.getUsers();
  }

 public getLocal():void {
  const getLocalData = JSON.parse(localStorage.getItem('user')!)
  console.log(getLocalData);
  this.userID = getLocalData.id
  console.log(this.userID);

}
  public getSingleCourseObj() {
    this.activeParams.params.subscribe((res) => {
      this.courseId = res['id'];
    });
    this.apiService.getSingleContent(this.courseId).subscribe((res) => {
      this.singleCourse = res['data'];
      console.log('hii',this.singleCourse);
    });
  }

  public getUsers():void {
    this.apiService.getContentLibrary().subscribe((res)=>{
      console.log("users",res);
    })
  }


  addToLibrary(course: any) {
    console.log(course);
    console.log(this.UserCourseArr);

    this.UserCourseArr.push(course)
    console.log("checking ", this.UserCourseArr);

    this.confirmationService.confirm({
      message: `Do you want to add this ${course?.attributes.name} to Library?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const courseDetails = {

            course_contents : course.id

        };
        console.log(courseDetails);


        this.apiService.putLibraryData(this.userID,courseDetails).subscribe((res) => {

          this.messageService.add({
            severity: 'success',
            summary: 'Successfully',
            detail: 'Course added to library',
          });
          this.getUsers()

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
    });


  }

  public coursesId: number[] = [];

  public LibCourseId:number[] = [];

  // public getUserLibrary() {
  //   this.apiService.getContentLibrary().subscribe((res) => {
  //     const libraryContent = res.data;
  //     console.log("LIB DATA",libraryContent);
  //     res.data.map((res:any)=>{
  //       return this.LibCourseId.push(res.attributes.course_content.data?.id);
  //     })
  //     console.log(this.LibCourseId);

  //   });
  // }

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

  // My edits

  parsePrice(price: string): number {
    return parseInt(price, 10);
  }

  @ViewChild('courseVideoElmt') courseVideoElmt!: ElementRef;
  isPlaying = false;
  private videoElement!: HTMLVideoElement;

  playCourse() {
    if (this.videoElement) {
      this.removeEventListeners();
    }
    this.videoElement = this.courseVideoElmt.nativeElement;
    this.videoElement.addEventListener('playing', this.onVideoPlaying);
    this.videoElement.addEventListener('pause', this.onVideoPaused);
  }

  private onVideoPlaying = () => {
    console.log('Video is playing');
  }

  private onVideoPaused = () => {
    console.log('Video is paused');
    this.isPlaying = !this.isPlaying;
  }

  private removeEventListeners() {
    this.videoElement.removeEventListener('playing', this.onVideoPlaying);
    this.videoElement.removeEventListener('pause', this.onVideoPaused);
  }

  public playVideo(){
    this.courseVideoElmt.nativeElement.play();
    this.onVideoPlaying
    this.isPlaying = !this.isPlaying;
  }


  ngOnDestroy() {
    if (this.videoElement) {
      this.removeEventListeners();
    }
  }
}
