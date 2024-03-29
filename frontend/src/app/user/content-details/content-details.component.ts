import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import {
  MessageService,
  ConfirmationService,
  ConfirmEventType,
} from 'primeng/api';
import { AllCourseContentData, SingleCourseData } from 'src/app/models/content';
import { AboutService } from 'src/app/services/about.service';
import { CartResponse } from 'src/app/models/cart';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environment/environment';
import { CourseData } from 'src/app/models/library';

@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService],
})
export class ContentDetailsComponent implements OnInit {
  public displayDialog = false;
  showSpinner: boolean = true;
  public courseId!: number;
  public userID!: number;
  public singleCourse!: any;
  userCourses: AllCourseContentData[] = [];
  userCourseID: number[] = [];
  @ViewChild('courseVideoElmt') courseVideoElmt!: ElementRef;
  isPlaying = false;
  private videoElement!: HTMLVideoElement;
  public img_url = environment.apiUrl;
  public libDataIds: number[] = [];
  public videoUrl!: SafeResourceUrl;
  public purchases!: number;

  constructor(
    public dialogService: DialogService,
    private activeParams: ActivatedRoute,
    private apiService: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private aboutService: AboutService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getCourses();
    this.getLocalData()
      .then(() => this.gettingUserHasCourse())
      .then(() => this.getSingleCourseObj())
      .then(() => this.getCartCourses());
    window.scrollTo(0, 0);
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

  public getCourses(): void {
    this.apiService.getContent().subscribe((res) => {
      this.userCourses = res.data;
      this.showSpinner = false;
    });
  }

  public gettingUserHasCourse(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiService.getUserCourse(this.userID).subscribe((res) => {
        res.map((resData: CourseData) => {
          this.libDataIds.push(resData.course_ids[0]?.id);
        });
        resolve(),
          (err: any) => {
            reject(err);
          };
      });
    });
  }

  public getSingleCourseObj(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.activeParams.params.subscribe((res) => {
        this.courseId = res['id'];
      });
      this.apiService.getSingleContent(this.courseId).subscribe((res) => {
        this.singleCourse = res['data'];
        this.videoUrl = this.getSafeVideoUrl(res['data'].attributes.link);
      });
      resolve();
      (error: any) => {
        reject(error);
      };
    });
  }

  getSafeVideoUrl(link: string): SafeResourceUrl {
    const videoId = this.extractVideoId(link);
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  extractVideoId(link: string): string {
    const regex =
      /youtu(?:\.be|be\.com)\/(?:.*v(?:\/|=)|(?:.*\/)?)([a-zA-Z0-9-_]+)/;
    const match = link?.match(regex);
    return match ? match[1] : '';
  }
  // Getting Cart courses
  public getCartCourses(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiService.getUserCart(this.userID).subscribe((res) => {
        res.map((resObj: CartResponse) => {
          this.userCourseID.push(resObj.course_ids[0]?.id);
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

        this.apiService.postCart(postCartbody).subscribe(
          (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successfully',
              detail: 'Course added to Cart',
            });
            this.getCartCourses();
          },
          (error: any) => {}
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

  addToLibrary(course: SingleCourseData) {
    this.purchases = course.attributes.no_of_purchases;
    this.confirmationService.confirm({
      message: `Do you want to add this ${course?.attributes.name} to Library?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const courseDetails = {
          data: {
            course_ids: course.id,
            user_id: this.userID,
          },
        };
        this.apiService.postUserHasCourse(courseDetails).subscribe((res) => {
          try {
            this.messageService.add({
              severity: 'success',
              summary: 'Successfully',
              detail: 'Course added to library',
            });
          } catch (err: any) {}

          this.gettingUserHasCourse();
          const putCourseBody = {
            data: {
              no_of_purchases: Number(this.purchases) + 1,
            },
          };
          this.apiService
            .updateContent(course?.id, putCourseBody)
            .subscribe((res) => {});
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
