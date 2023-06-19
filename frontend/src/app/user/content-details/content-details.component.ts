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
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
// import { ContentResponse } from 'src/app/models/content';
import {
  MessageService,
  ConfirmationService,
  ConfirmEventType,
} from 'primeng/api';
import { AllCourseContentData, SingleCourseData } from 'src/app/models/content';
import { AboutService } from 'src/app/services/about.service';
import { CartResponse } from 'src/app/models/cart';

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
  userCourses: AllCourseContentData[] = [];
  userCourseID: number[] = [];
  @ViewChild('courseVideoElmt') courseVideoElmt!: ElementRef;
  isPlaying = false;
  private videoElement!: HTMLVideoElement;

  constructor(
    public dialogService: DialogService,
    private activeParams: ActivatedRoute,
    private apiService: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private aboutService: AboutService
  ) {}

  ngOnInit(): void {
    this.getCourses();
    this.getLocalData()
      .then(() => this.gettingUserHasCourse())
      .then(() => this.getSingleCourseObj())
      .then(() => this.getCartCourses());
      window.scrollTo(0,0);
      this.gettingUserHasCourse();

    window.scrollTo(0, 0);
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

  libDataIds: number[] = [];
  public gettingUserHasCourse(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiService.getUserCourse(this.userID).subscribe((res) => {
        console.log(res);
        res.map((resData:any)=>{
          this.libDataIds.push(resData.course_ids[0].id)
        })
        console.log(this.libDataIds);
        resolve(),
          (err: any) => {
            reject(err);
          };
      });
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
        console.log(res);

        res.map((resObj: CartResponse) => {
          this.userCourseID.push(resObj.course_ids[0].id);
        });
        this.userCourseID = [...new Set(this.userCourseID)];
        this.aboutService.userCartLength(res.length);
      });
      resolve();
      (error: any) => {
        reject(error);
      };
    });
  }

  public addToCart(item: SingleCourseData): void {
    console.log(item);

    this.confirmationService.confirm({
      message: `Do you want to add this ${item?.attributes.name} to Cart?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const postCartbody = {
          data: {
            user_id: this.userID,
            course_ids: item.id,
          },
        };
        console.log(postCartbody);

        this.apiService.postCart(postCartbody).subscribe(
          (res) => {
            console.log(res);

            this.messageService.add({
              severity: 'success',
              summary: 'Successfully',
              detail: 'Course added to Cart',
            });
            this.getCartCourses();
          },
          (error: any) => {
            console.log('Error', error);
          }
        );
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
  public GotoCart(): void {
    this.router.navigate(['mycart']);
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
