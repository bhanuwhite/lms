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
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
// import { ContentResponse } from 'src/app/models/content';
import {
  MessageService,
  ConfirmationService,
  ConfirmEventType,
} from 'primeng/api';
import { AllCourseContentData } from 'src/app/models/content';

@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService],
})
export class ContentDetailsComponent implements OnInit {
  public displayDialog = false;
  public courseId!: number;
  public userID!: number;
  public singleCourse!: AllCourseContentData;
  userCourses: any;
  userCourseID: number[] = [];
  @ViewChild('courseVideoElmt') courseVideoElmt!: ElementRef;
  isPlaying = false;
  private videoElement!: HTMLVideoElement;

  constructor(
    public dialogService: DialogService,
    private activeParams: ActivatedRoute,
    private apiService: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getCourses();
    this.getLocalData()
      .then(() => this.getSingleCourseObj())
      .then(() => this.getCartCourses());
  }

  public getLocalData(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const getLocalData = JSON.parse(localStorage.getItem('user')!);
      this.userID = getLocalData.id;
      resolve();
      (error: any) => {
        reject(error);
      };
    });
  }

  public getCourses(): void {
    this.apiService.getContent().subscribe((res) => {
      this.userCourses = res.data;
    });
  }

  public getSingleCourseObj(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.activeParams.params.subscribe((res) => {
        this.courseId = res['id'];
      });
      this.apiService.getSingleContent(this.courseId).subscribe((res) => {
        this.singleCourse = res['data'];
      });
      resolve();
      (error: any) => {
        reject(error);
      };
    });
  }

  // Getting Cart courses
  public getCartCourses(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiService.getUserCart(this.userID).subscribe((res) => {
        res.map((resObj: any) => {
          this.userCourseID.push(resObj.course_ids[0].id);
        });
        this.userCourseID = [...new Set(this.userCourseID)];
      });
      resolve();
      (error: any) => {
        reject(error);
      };
    });
  }

  public addToCart(item: any): void {
    this.confirmationService.confirm({
      message: `Do you want to add this ${item?.attributes.name} to Library?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const postCartbody = {
          data: {
            user_id: this.userID,
            course_ids: item.id,
          },
        };

        this.apiService.postCart(postCartbody).subscribe((res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successfully',
            detail: 'Course added to Cart',
          });
          this.getCartCourses();
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

  // onClickVideo(courseDetails: {}) {
  //   const ref = this.dialogService.open(VideoPopupComponent, {
  //     header: 'Course Preview',
  //     width: '50%',
  //     data: { name: 'John' },
  //   });
  // }
  onClose() {
    this.displayDialog = false;
  }

  parsePrice(price: string): number {
    return parseInt(price, 10);
  }

  playCourse() {
    if (this.videoElement) {
      this.removeEventListeners();
    }
    this.videoElement = this.courseVideoElmt.nativeElement;
    this.videoElement.addEventListener('playing', this.onVideoPlaying);
    this.videoElement.addEventListener('pause', this.onVideoPaused);
  }

  private onVideoPlaying = () => {};

  private onVideoPaused = () => {
    this.isPlaying = !this.isPlaying;
  };

  private removeEventListeners() {
    this.videoElement.removeEventListener('playing', this.onVideoPlaying);
    this.videoElement.removeEventListener('pause', this.onVideoPaused);
  }

  public playVideo() {
    this.courseVideoElmt.nativeElement.play();
    this.onVideoPlaying;
    this.isPlaying = !this.isPlaying;
  }

  ngOnDestroy() {
    if (this.videoElement) {
      this.removeEventListeners();
    }
  }
}
