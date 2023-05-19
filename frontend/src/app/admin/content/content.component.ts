import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import {
  ContentData,
  ContentResponse,
  mediaDataObj,
  AllCourseContent,
  AllCourseContentData,
  ContentImgUpload,
  AllCourseContentVideo,
  AllCourseContentPlaceholder_Img,
  CourseContentVideoData,
} from 'src/app/models/content';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  styles: [
    `
      :host ::ng-deep button {
        margin-right: 0.25em;
      }
    `,
  ],
  providers: [ConfirmationService, MessageService],
})
export class ContentComponent implements OnInit, OnDestroy {
  @ViewChild('vid', { read: ElementRef }) tempRef!: ElementRef;

  private contentGetSubsription$: Subscription = new Subscription();
  private contentPostSubsription$: Subscription = new Subscription();
  private contentUpdateSubsription$: Subscription = new Subscription();
  private contentDeleteSubsription$: Subscription = new Subscription();
  private fileUploadForPostSubscription$: Subscription = new Subscription();
  private fileUploadForUpdateSubscription$: Subscription = new Subscription();
  private allSubsription$: Subscription[] = [];

  loadingSpinner: boolean = false;
  editDisply: boolean = false;
  public contentData!: AllCourseContentData[];
  public _data!: AllCourseContentData;
  public formData = new FormData();
  public percentage: number = 0;
  public isProgressFile: boolean = false;
  public courseGroup!: FormGroup;
  public courseUpdateGroup!: FormGroup;
  addCourse!: FormGroup;
  remainingWords: number = 100;
  remWord: number = 100;
  Admin_id!: number;
  techString!: string;
  statusString!: string;
  courseDialog: boolean = false;
  selectedTech!: string;
  selectedStatus!: string;
  updatedStatus!: string;
  videoUploadProgress: boolean = false;
  imgUploadProgress: boolean = false;
  videoContent!: AllCourseContentVideo;
  imageContent!: AllCourseContentPlaceholder_Img;
  courseContentVideo!: CourseContentVideoData;
  courseContentImage: any;

  Technologies = [
    { tech: 'Angular' },
    { tech: 'DotNet' },
    { tech: 'Java' },
    { tech: 'Javascript' },
    { tech: 'MongoDB' },
    { tech: 'MySQL' },
    { tech: 'Node JS' },
    { tech: 'Postgresql' },
    { tech: 'Python' },
    { tech: 'React JS' },
  ];
  courseStatus = [{ status: 'active' }, { status: 'block' }];

  constructor(
    private router: Router,
    private apiService: ApiService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getContent();
    this.courseUpdateValidate();
    this.newCourse();
    this.getLocalData();
  }

  ngAfterViewInit(): void {

  }



  public getLocalData() {
    const localData = JSON.parse(localStorage.getItem('user')!);
    this.Admin_id = localData.id;
  }

  updateProgress(vid: HTMLVideoElement) {
    const progress = (vid.currentTime / vid.duration) * 100;
    this.percentage = Math.round(progress);
  }

  trackVideoProgress(event: any) {
    const video = event.target;
    const duartionPercentage = (video.currentTime / video.duration) * 100;
    this.percentage = Math.ceil(duartionPercentage);
    console.log(`Video progress: ${this.percentage}%`);
  }

  public onLogout(): void {
    this.router.navigateByUrl('/login');
    localStorage.clear();
    location.reload();
  }

  // update validations
  public courseUpdateValidate(): void {
    this.courseUpdateGroup = this.fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      price: new FormControl(''),
      imgVideo: new FormControl(''),
      technology: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      link: new FormControl(''),
      admin_id: new FormControl(''),
      image: new FormControl(),
    });
  }

  // get content
  public getContent(): void {
    this.loadingSpinner = true;
    this.apiService.getContent().subscribe((res: AllCourseContent) => {
      try {
        console.log(res);

        this.contentData = res.data;
        console.log('Getting content', this.contentData);
        this.loadingSpinner = false;
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error !!',
          detail: 'Something went wrong !!',
        });
      }
    });
  }


  // New Course adding details.

  public newCourse() {
    this.addCourse = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl(''),
      imgVideo: new FormControl(''),
      technology: new FormControl(''),
      status: new FormControl('', [Validators.required]),
      admin_id: new FormControl(this.Admin_id),
      price: new FormControl(''),
      image: new FormControl(''),
      link: ['', [Validators.pattern('^https?://.+')]],
    });
  }

  public showCourseDialog() {
    this.courseDialog = true;
  }
  public closeCourseDialog() {
    this.courseDialog = false;
  }

  public techSelected(event: any) {
    this.selectedTech = event.value.tech;
    console.log(this.selectedTech);
  }
  public statusSelected(event: any) {
    this.selectedStatus = event.value.status;
  }
  public statusSelected2(event: any) {
    console.log(event);

    this.updatedStatus = event.value.status;
  }

  checkWordCount() {
    const textValue = this.addCourse.controls['description'].value;
    const wordCount = textValue?.trim().split(/\s+/).length;
    this.remainingWords = 100 - wordCount;

    if (this.remainingWords < 0) {
      const words = textValue.trim().split(/\s+/);
      this.addCourse.controls['description'].setValue(
        words.slice(0, 100).join(' ')
      );
      this.remainingWords = 0;
    }
  }


  public courseFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.videoUploadProgress = true;
    if (target.files?.length) {
      const file = target.files[0];
      this.addCourse.get('imgVideo')?.setValue(file);
      this.formData = new FormData();
      this.formData.append('files', this.addCourse.value.imgVideo);
      this.apiService.uploadFile(this.formData).subscribe((res) => {
        try {
          console.log("upload response",res);
          this.courseContentVideo = res;
          // console.log("couseContentVideo", this.courseContentVideo );

          this.videoUploadProgress = false;
          // console.log('Video Uploaded', this.courseContentVideo);
        } catch (error) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went to wrong !!',
          });
        }
      });
    }
  }

  public courseFileSelected2(event: Event) {
    const target = event.target as HTMLInputElement;
    this.imgUploadProgress = true;
    if (target.files?.length) {
      const file = target.files[0];
      this.addCourse.get('imgVideo')?.setValue(file);
      this.formData = new FormData();
      this.formData.append('files', this.addCourse.value.imgVideo);
      this.apiService.uploadFile(this.formData).subscribe((res) => {
        try {

          this.courseContentImage = res;
          console.log('Img Uploaded', this.courseContentImage);
          this.imgUploadProgress = false;
        } catch (error) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went to wrong !!',
          });
        }
      });
    }
  }

  public courseFormSubmit(videoInput: any, imgInput: any) {
    console.log(this.addCourse);
    console.log(this.addCourse.value);
    this.courseDialog = false;
    const courseData = {
      data: {
        technology: this.selectedTech,
        content: this.courseContentVideo,
        description: this.addCourse.value.description,
        link: this.addCourse.value.link,
        name: this.addCourse.value.name,
        placeholder_img: this.courseContentImage,
        price: this.addCourse.value.price,
        user_id: this.Admin_id,
        status: this.selectedStatus,
      },
    };
    console.log(courseData);

    this.apiService.postContent(courseData).subscribe((res) => {
      try {
        console.log(res);

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Course added successfully !!',
        });
        this.addCourse.get('technology')?.reset();
        this.addCourse.get('description')?.reset();
        this.addCourse.get('link')?.reset();
        this.addCourse.get('name')?.reset();
        this.addCourse.get('price')?.reset();
        this.addCourse.get('status')?.reset();
        videoInput.value = '';
        imgInput.value = '';

        console.log(this.courseContentVideo);
        console.log(this.courseContentImage);
        this.getContent();
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Something went wrong.',
          detail: 'Course not added !!',
        });
      }
    });
  }

  // Edit dialog open

  public editContentDialog(item: AllCourseContentData): void {
    this.editDisply = true;
    this._data = item;
    console.log("_data item", item);
    console.log(item.attributes?.placeholder_img);
    console.log(item.attributes?.content);



    this.techString = item.attributes?.technology;
    this.statusString = item.attributes?.status;
    this.videoContent = item.attributes?.content;
    this.imageContent = item.attributes?.placeholder_img;

    this.courseUpdateGroup = this.fb.group({
      name: new FormControl(item.attributes?.name, [Validators.required]),
      description: new FormControl(item.attributes?.description),
      price: new FormControl(item.attributes?.price),
      technology: [{ tech: this.techString }],
      link: new FormControl(item.attributes?.link),
      status: [{ status: this.statusString }],
      user_id: new FormControl(item.attributes?.user_id),
      image: new FormControl(this.imageContent),
      imgVideo: new FormControl(this.videoContent),
    });

  }

  // close edit dialog
  public closeEditDialog(): void {
    this.editDisply = false;
  }

  // update content
  public onUpdateContent(): void {
    this.editDisply = false;
    const updateCourseData = {
      data: {
        technology: this.selectedTech,
        content: this.courseContentVideo,
        description: this.courseUpdateGroup.value.description,
        link: this.courseUpdateGroup.value.link,
        name: this.courseUpdateGroup.value.name,
        placeholder_img: this.courseContentImage,
        price: this.courseUpdateGroup.value.price,
        user_id: this.Admin_id,
        status: this.selectedStatus,
      },
    };

    // Post api call here
    this.apiService
      .updateContent(this._data.id, updateCourseData)
      .subscribe((res) => {
        try {
          this.editDisply = false;
          this.messageService.add({
            severity: 'info',
            summary: 'Update',
            detail: 'Content updated successfully !!',
          });
          this.getContent();
        } catch (error) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Somthing went to wrong !!',
          });
        }
      });
  }

  // Delete content
  public deleteDialog(data: AllCourseContentData): void {
    this.confirmationService.confirm({
      message: `Do you want to delete - ${data.attributes?.name} ?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.apiService.deleteContent(data.id).subscribe((res) => {
          try {
            this.messageService.add({
              severity: 'error',
              summary: 'Delete',
              detail: 'Content deleted successfully !',
            });
            this.getContent();
          } catch (error) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Something went to wrong !!',
            });
          }
        });
      },
      reject: () => {},
    });
  }
  ngOnDestroy(): void {
    // this.contentGetSubsription$.unsubscribe();
    // this.contentPostSubsription$.unsubscribe();
    // this.contentUpdateSubsription$.unsubscribe();
    // this.contentUploadSubsription$.unsubscribe();
    // this.contentDeleteSubsription$.unsubscribe();
    this.allSubsription$.forEach((subScriptions) => {
      subScriptions.unsubscribe();
    });
  }

}
