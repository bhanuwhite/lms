import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import {
  AllCourseContentData,
  AllCourseContentVideo,
  AllCourseContentPlaceholder_Img,
  AllCourseContent,
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

  public searchWord: string = '';
  loadingSpinner: boolean = false;
  editDisply: boolean = false;
  public contentData: AllCourseContentData[] = [];
  public contentData2: AllCourseContentData[] = [];

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
  levelString!: string;
  statusString!: string;
  courseDialog: boolean = false;
  selectedTech!: string;
  selectedLevel!: string;
  selectedStatus!: string;
  updatedStatus!: string;
  videoUploadProgress: boolean = false;
  imgUploadProgress: boolean = false;
  videoContent!: AllCourseContentVideo;
  imageContent!: AllCourseContentPlaceholder_Img;
  courseContentVideo: any[] = [];
  courseContentImage: any;
  allVideosDuration: number = 0;

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

  levels = [
    { level: 'Beginner' },
    { level: 'Intermediate' },
    { level: 'Advanced' },
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

  public getLocalData() {
    const localData = JSON.parse(localStorage.getItem('user')!);
    this.Admin_id = localData.id;
  }

  updateProgress(vid: HTMLVideoElement) {
    const progress = (vid.currentTime / vid.duration) * 100;
    this.percentage = Math.round(progress);
  }

  public onLogout(): void {
    this.router.navigateByUrl('/login');
    localStorage.clear();
    location.reload();
  }

  // New Course adding details.

  public newCourse() {
    this.addCourse = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl(''),
      imgVideo: new FormControl(''),
      technology: new FormControl('', [Validators.required]),
      status: new FormControl({ status: 'active' }),
      admin_id: new FormControl(this.Admin_id),
      price: new FormControl(''),
      image: new FormControl(''),
      course_duration: new FormControl(),
      level: new FormControl(''),
      link: ['', [Validators.pattern('^https?://.+')]],
    });
  }

  // update validations
  public courseUpdateValidate(): void {
    this.courseUpdateGroup = this.fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      price: new FormControl(''),
      imgVideo: new FormControl(''),
      technology: new FormControl('', [Validators.required]),
      level: new FormControl(''),
      status: new FormControl('', [Validators.required]),
      link: new FormControl(''),
      admin_id: new FormControl(''),
      image: new FormControl(),
      course_duration: new FormControl(),
    });
  }

  // get content
  public getContent(): void {
    this.loadingSpinner = true;
    this.apiService.getContent().subscribe((res: AllCourseContent) => {
      try {
        this.contentData = res.data;
        this.contentData2 = res.data;
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

  // Search Functionality
  public filterCourse(): void {
    if (this.searchWord) {
      this.contentData = this.contentData2.filter(
        (content) =>
          content.attributes.name
            .toLowerCase()
            .includes(this.searchWord.toLowerCase()) ||
          content.attributes.price.includes(this.searchWord.toLowerCase())
      );
    } else {
      this.contentData = this.contentData2;
    }
  }

  public showCourseDialog() {
    this.courseDialog = true;
  }
  public closeCourseDialog() {
    this.courseDialog = false;
    this.addCourse.controls['name'].reset();
    this.addCourse.controls['description'].reset();
    this.addCourse.controls['technology'].reset();
    this.addCourse.controls['price'].reset();
    this.addCourse.controls['link'].reset();
    this.addCourse.controls['level'].reset();
  }

  public techSelected(event: { value: { tech: string } }) {
    this.selectedTech = event.value.tech;
  }

  public levelSelected(event: { value: { level: string } }) {
    this.selectedLevel = event.value.level;
  }

  public statusSelected(event: { value: { status: string } }) {
    this.selectedStatus = event.value.status;
  }
  public statusSelected2(event: { value: { status: string } }) {
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

  public async courseFileSelect(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;
    const selectedFiles = Array.from(target.files || []);
    this.videoUploadProgress = true;
    this.courseContentVideo = [];
    const uploadPromises: Promise<any>[] = [];
    let currentUploadIndex = 0;
    selectedFiles.forEach((file) => {
      const uploadPromise = new Promise<void>((resolve, reject) => {
        this.addCourse.get('imgVideo')?.setValue(file);
        this.formData = new FormData();
        this.formData.append('files', this.addCourse.value.imgVideo);
        this.apiService.uploadFile(this.formData).subscribe(
          (res) => {
            try {
              this.getVideoDuration(file).then((duration) => {
                this.allVideosDuration = this.allVideosDuration + duration;
                this.courseContentVideo[currentUploadIndex] = res[0];
                currentUploadIndex++;
                resolve();
              });
            } catch (error) {
              reject(error);
            }
          },
          (error) => {
            reject(error);
          }
        );
      });
      uploadPromises.push(uploadPromise);
    });

    try {
      await Promise.all(uploadPromises);
      this.videoUploadProgress = false;
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Something went wrong!',
      });
      console.error(error);
    }
  }

  private getVideoDuration(file: File): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        const duration = video.duration;
        document.body.removeChild(video);
        resolve(duration);
      };
      video.onerror = (error) => {
        document.body.removeChild(video);
        reject(error);
      };
      video.src = URL.createObjectURL(file);
      document.body.appendChild(video);
    });
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

  public courseFormSubmit(
    videoInput: HTMLInputElement,
    imgInput: HTMLInputElement
  ) {
    this.courseDialog = false;
    const courseData = {
      data: {
        technology: this.selectedTech,
        content: this.courseContentVideo,
        description: this.addCourse.value.description,
        link: this.addCourse.value.link,
        name: this.addCourse.value.name,
        placeholder_img: this.courseContentImage[0],
        price: this.addCourse.value.price,
        user_id: this.Admin_id,
        status: 'active',
        level: this.selectedLevel,
        course_duration: this.allVideosDuration.toFixed(0),
      },
    };

    if (this.courseContentVideo.length != 0) {
      this.apiService.postContent(courseData).subscribe((res) => {
        try {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Course added successfully !!',
          });
          this.addCourse.controls['name'].reset();
          this.addCourse.controls['description'].reset();
          this.addCourse.controls['technology'].reset();
          this.addCourse.controls['price'].reset();
          this.addCourse.controls['link'].reset();
          this.addCourse.controls['level'].reset();

          videoInput.value = '';
          imgInput.value = '';
          this.allVideosDuration = 0;
          this.getContent();
        } catch (error) {
          this.messageService.add({
            severity: 'error',
            summary: 'Something went wrong.',
            detail: 'Course not added !!',
          });
        }
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Course Content is empty',
        detail: 'Please upload content.  !!',
      });
    }
  }

  // Edit dialog open

  public editContentDialog(item: AllCourseContentData): void {
    this.editDisply = true;
    this._data = item;

    this.techString = item.attributes?.technology;
    this.levelString = item.attributes?.level;
    this.statusString = item.attributes?.status;
    this.videoContent = item.attributes?.content;
    this.imageContent = item.attributes?.placeholder_img;

    this.courseUpdateGroup = this.fb.group({
      name: new FormControl(item.attributes?.name, [Validators.required]),
      description: new FormControl(item.attributes?.description),
      price: new FormControl(item.attributes?.price),
      technology: [{ tech: this.techString }],
      level: [{ level: this.levelString }],
      link: new FormControl(item.attributes?.link),
      status: 'active',
      user_id: new FormControl(this.Admin_id),
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
        level: this.selectedLevel,
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
    if (this.courseContentVideo.length != 0) {
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
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Please upload content',
      });
    }
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
    this.allSubsription$.forEach((subScriptions) => {
      subScriptions.unsubscribe();
    });
  }
}
