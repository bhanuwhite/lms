import {
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
  FormArray,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import {
  AllCourseContentData,
  AllCourseContentVideo,
  AllCourseContentPlaceholder_Img,
  AllCourseContent,
  mediaDocument,
  videoObj,
} from 'src/app/models/content';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environment/environment';

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
  popup: string = '';
  private allSubsription$: Subscription[] = [];
  public imgUrl = environment.apiUrl;
  public searchWord: string = '';
  public loadingSpinner: boolean = false;
  public editDisply: boolean = false;
  public contentData: AllCourseContentData[] = [];
  public contentData2: AllCourseContentData[] = [];
  public _data!: AllCourseContentData;
  public formData = new FormData();
  public percentage: number = 0;
  public isProgressFile: boolean = false;
  public courseGroup!: FormGroup;
  public courseUpdateGroup!: FormGroup;
  public addCourse!: FormGroup;
  public remainingWords: number = 100;
  public remWord: number = 100;
  public Admin_id!: number;
  public techString!: string;
  public levelString!: string;
  public statusString!: string;
  public subjectString!: string;
  public courseDialog: boolean = false;
  public selectedTech!: string;
  public selectedLevel!: string;
  public selectedSubject!: string;
  public selectedStatus!: string;
  public updatedStatus!: string;
  public videoUploadProgress: boolean = false;
  public imgUploadProgress: boolean = false;
  public videoContent!: AllCourseContentVideo;
  public imageContent!: AllCourseContentPlaceholder_Img;
  public courseContentVideo: any[] = [];
  public courseContentImage: any;
  public allVideosDuration: number = 0;
  public showDocuments: boolean = false;
  public courseDocument!: mediaDocument;
  public updateCertificates: boolean = false;
  public updateDocuments: boolean = false;
  public editUserLearnings!: AllCourseContentData;

  Technologies: { tech: string }[] = [
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

  subjects = [
    { industry: 'Business development' },
    { industry: 'Database' },
    { industry: 'Information & cyber security' },
    { industry: 'Software development' },
    { industry: 'Web development' },
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
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z., ]+$'),
      ]),
      description: new FormControl(''),
      imgVideo: new FormControl(''),
      image: new FormControl(''),
      technology: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
      status: new FormControl({ status: 'active' }),
      admin_id: new FormControl(this.Admin_id),
      price: new FormControl('', [Validators.required]),
      course_duration: new FormControl(),
      level: new FormControl('', [Validators.required]),
      link: ['', [Validators.pattern('^https?://.+')]],
      coursesIncludes: this.fb.array([]),
      categoryCheck: '',
      documentCheck: '',
      documents: [''],
    });
  }

  // Get Content
  public img_url = environment.apiUrl;
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
          detail: 'Failed to load Courses... !!',
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
    this.imgUploadProgress = false;
    this.addCourse.reset();
    this.courseContentVideo = [];
    this.addCourse.get('documents')?.removeValidators(Validators.required);
  }
  technologyArr: string[] = [];
  public techSelected(event: any) {
    this.technologyArr = event.value.map((item: { tech: string }) => item.tech);
  }
  public levelSelected(event: { value: { level: string } }) {
    this.selectedLevel = event.value.level;
  }
  public subjectSelected(event: { value: { industry: string } }) {
    this.selectedSubject = event.value.industry;
  }
  public statusSelected(event: { value: { status: string } }) {
    this.selectedStatus = event.value.status;
  }

  public checkWordCount(): void {
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
  public editcheckWordCount(): void {
    const textString = this.courseUpdateGroup.value.description;
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
        detail: 'While uploading the videos!',
      });
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
      const fileName = file.name;
      this.addCourse.get('image')?.setValue(file);
      this.formData = new FormData();
      this.formData.append('files', this.addCourse.value.image);
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

  public checkboxValue(event: Event, value: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const isChecked = (event.target as HTMLInputElement).checked;
      const arrayForm = this.addCourse.get('coursesIncludes') as FormArray;

      if (isChecked) {
        arrayForm.push(this.fb.control(value));
        if (value.toLowerCase() === 'documents') {
          this.showDocuments = true;
          this.addCourse.get('documents')?.setValidators(Validators.required);
        }
      } else {
        const index = arrayForm.controls.findIndex(
          (control) => control.value === value
        );
        if (index !== -1) {
          arrayForm.removeAt(index);
          if (value.toLowerCase() === 'documents') {
            this.showDocuments = false;
            this.addCourse.get('documents')?.clearValidators();
          }
        }
      }

      this.addCourse.get('documents')?.updateValueAndValidity();
      resolve();
    });
  }

  public courseDocSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files?.length) {
      const file = target.files[0];
      this.addCourse.get('documents')?.setValue(file);
      this.formData = new FormData();
      this.formData.append('files', this.addCourse.value.documents);
      this.apiService.uploadFile(this.formData).subscribe((res) => {
        try {
          this.courseDocument = res;
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

  public onInputChanged(data: Event, videoDescObj: videoObj) {
    const value = (data.target as HTMLTextAreaElement).value;
    const videoDesc = {
      fileInfo: {
        alternativeText: value,
      },
    };
    this.apiService
      .uploadVideoDesc(videoDescObj.id, videoDesc)
      .subscribe((res) => {
      });
  }

  convertToNumber(value: string): number {
    return Number(value);
  }
  public elements = document.getElementsByTagName('input');

  private markAllFieldsAsTouched() {
    Object.values(this.addCourse.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  public data!: { [key: number]: string };

  public courseFormSubmit(
    videoInput: HTMLInputElement,
    imgInput: HTMLInputElement
  ) {
    this.data = {};
    for (let i = 0; i < this.technologyArr.length; i++) {
      this.data[i + 1] = this.technologyArr[i];
    }
    this.markAllFieldsAsTouched();

    if (this.addCourse.valid) {
      this.courseDialog = false;
      const courseData = {
        data: {
          technologies: this.data,
          level: this.selectedLevel,
          subject: this.selectedSubject,
          content: this.courseContentVideo,
          description: this.addCourse.value.description,
          link: this.addCourse.value.link,
          name: this.addCourse.value.name,
          placeholder_img: this.courseContentImage ? this.courseContentImage[0]:null,
          price: this.addCourse.value.price,
          user_id: this.Admin_id,
          status: 'active',
          total_duration: this.allVideosDuration.toFixed(0),
          course_include: this.addCourse.value.coursesIncludes,
          files: this.courseDocument,
        },
      };

      this.apiService.postContent(courseData).subscribe((res) => {
        try {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Course added successfully !!',
          });
          this.courseContentVideo = [];
          this.showDocuments = false;
          this.addCourse
            .get('documents')
            ?.removeValidators(Validators.required);

          videoInput.value = '';
          imgInput.value = '';
          this.allVideosDuration = 0;
          this.getContent();
          this.addCourse.reset();
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
        detail: 'Please fill required fields..!!',
      });
    }

    for (let i = 0; i < this.elements.length; i++) {
      if (this.elements[i].type == 'checkbox') {
        this.elements[i].checked = false;
      }
    }
  }

  public editContentDialog(item: AllCourseContentData): void {
    this.editUserLearnings = item;
  }

  // Delete content
  public deleteDialog(data: AllCourseContentData): void {
    this.confirmationService.confirm({
      message: `Do you want to delete - ${data.attributes?.name.slice(
        0,
        20
      )} ?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.apiService.deleteContent(data.id).subscribe((res) => {
          try {
            this.messageService.add({
              severity: 'success',
              summary: 'Deleted',
              detail: `${data.attributes?.name.slice(
                0,
                20
              )} deleted successfully !`,
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
