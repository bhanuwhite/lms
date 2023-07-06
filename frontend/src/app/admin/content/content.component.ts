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
  AllCourseContent,mediaDocument
} from 'src/app/models/content';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

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
  addCourse!: FormGroup;
  remainingWords: number = 100;
  remWord: number = 100;
  Admin_id!: number;
  techString!: string;
  levelString!: string;
  statusString!: string;
  subjectString!: string;
  courseDialog: boolean = false;
  selectedTech!: string;
  selectedLevel!: string;
  selectedSubject!: string;
  selectedStatus!: string;
  updatedStatus!: string;
  videoUploadProgress: boolean = false;
  imgUploadProgress: boolean = false;
  videoContent!: AllCourseContentVideo;
  imageContent!: AllCourseContentPlaceholder_Img;
  courseContentVideo: any[] = [];
  courseContentImage: any;
  allVideosDuration: number = 0;
  showDocuments: boolean = false;
  courseDocument!: mediaDocument;
  updateCertificates: boolean = false;
  updateDocuments: boolean = false;
  editUserLearnings!: AllCourseContentData;

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
    private messageService: MessageService,
    private http: HttpClient
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
      price: new FormControl(''),
      course_duration: new FormControl(),
      level: new FormControl('', [Validators.required]),
      link: ['', [Validators.pattern('^https?://.+')]],
      userLearnings: this.fb.array([this.user_learn()]),
      coursesIncludes: this.fb.array([]),
      categoryCheck: '',
      documentCheck: '',
      documents: new FormControl(),
      preLearn1: new FormControl(),
      preLearn2: new FormControl(),
      preLearn3: new FormControl(),
      preLearn4: new FormControl(),
    });
  }
  get userLearningControls(): FormArray {
    return this.addCourse.get('userLearnings') as FormArray;
  }

  user_learn(): FormGroup {
    return this.fb.group({
      u_learn: [''],
    });
  }

  addItem(): void {
    this.userLearningControls.push(this.user_learn());
  }

  removeUserLearning(index: number): void {
    this.userLearningControls.removeAt(index);
  }

  // update validations
  public courseUpdateValidate(): void {
    this.courseUpdateGroup = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z., ]+$'),
      ]),
      description: new FormControl(''),
      price: new FormControl(''),
      imgVideo: new FormControl(''),
      technology: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
      level: new FormControl(''),
      status: new FormControl('', [Validators.required]),
      link: new FormControl(''),
      admin_id: new FormControl(''),
      image: new FormControl(),
      course_duration: new FormControl(),
      courserIncludes: this.fb.array([]),
      documents: new FormControl(),
      preLearn1: new FormControl(),
      preLearn2: new FormControl(),
      preLearn3: new FormControl(),
      preLearn4: new FormControl(),
      userLearnings: this.fb.array([]),
    });
  }

  get updateUserLearnings(): FormArray {
    return this.courseUpdateGroup.get('userLearnings') as FormArray;
  }

  public update_user_learn(): FormGroup {
    return this.fb.group({
      u_learn: [''],
    });
  }

  public update_addItem(): void {
    this.updateUserLearnings.push(this.update_user_learn());
  }

  public update_removeUserLearning(index: number): void {
    this.updateUserLearnings.removeAt(index);
  }

  // get content
  totalAvgRating: number | null = 0;
  sum: number = 0;
  ratingData: any;
  // Get Content

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
    // this.popup="add"
  }
  public closeCourseDialog() {
    this.courseDialog = false;
    this.addCourse.reset();
    this.addCourse.get('documents')?.removeValidators(Validators.required);
  }
  public techSelected(event: { value: { tech: string } }) {
    this.selectedTech = event.value.tech;
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

  public editcheckWord(description: any): void {
    this.remainingWords = 100 - description.split(' ').length;
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
          this.convertUrlToFile(res[0].formats.thumbnail.url, fileName).then(
            (imgFile: any) => {}
          );
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

  convertUrlToFile(url: string, fileName: string): Promise<File> {
    return new Promise<File>((resolve, reject) => {
      this.http.get(url, { responseType: 'blob' }).subscribe(
        (blob: Blob) => {
          const file = new File([blob], fileName, {
            type: 'image/jpeg',
          });
          resolve(file);
        },
        (error) => {
          resolve(new File([], 'default.jpg', { type: 'image/jpeg' }));
        }
      );
    });
  }

  checkboxValue(event: any, value: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const arrayForm = <FormArray>this.addCourse.get('coursesIncludes');
      if (event?.target?.checked) {
        arrayForm.push(this.fb.control(value));
        if (event.target.value.toLowerCase() === 'documents') {
          this.showDocuments = true;
          this.addCourse.get('documents')?.setValidators(Validators.required);
        }
      } else {
        const index = arrayForm.controls.findIndex(
          (control) => control.value === value
        );
        if (index !== -1) {
          arrayForm.removeAt(index);
          if (event.target.value.toLowerCase() === 'documents') {
            this.showDocuments = false;
            this.addCourse.get('documents')?.clearValidators();
          }
        }
      }
      this.addCourse.get('documents')?.updateValueAndValidity();
      resolve(),
        (err: any) => {
          reject(err);
        };
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
          console.log(res);

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

  public onInputChanged(data: any, videoDescObj: any) {
    const videoDesc = {
      fileInfo: {
        alternativeText: data.value,
      },
    };
    this.apiService
      .uploadVideoDesc(videoDescObj.id, videoDesc)
      .subscribe((res) => {});
  }


  public elements = document.getElementsByTagName('input');

  public userLearnObj: { [key: number]: string } = {};
  public courseFormSubmit(
    videoInput: HTMLInputElement,
    imgInput: HTMLInputElement
  ) {
    for (let i = 0; i < this.addCourse.value.userLearnings.length; i++) {
      this.userLearnObj[i] = this.addCourse.value.userLearnings[i]?.u_learn;
    }
    this.courseDialog = false;
    const courseData = {
      data: {
        technology: this.selectedTech,
        subject: this.selectedSubject,
        content: this.courseContentVideo,
        description: this.addCourse.value.description,
        link: this.addCourse.value.link,
        name: this.addCourse.value.name,
        placeholder_img: this.courseContentImage[0],
        price: this.addCourse.value.price,
        user_id: this.Admin_id,
        status: 'active',
        level: this.selectedLevel,
        total_duration: this.allVideosDuration.toFixed(0),
        pre_learning: {
          1: this.addCourse.value.preLearn1,
          2: this.addCourse.value.preLearn2,
          3: this.addCourse.value.preLearn3,
          4: this.addCourse.value.preLearn4,
        },
        user_learning: this.userLearnObj,
        course_include: this.addCourse.value.coursesIncludes,
        files: this.courseDocument,
      },
    };

    const learnings = this.addCourse.get('userLearnings') as FormArray;

    for (let i = learnings.length - 1; i > 0; i--) {
      this.userLearningControls.removeAt(i);
    }

    if (this.courseContentVideo.length != 0) {
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
          this.addCourse.controls['userLearnings'].reset();
          const arrayForm = <FormArray>this.addCourse.get('coursesIncludes');
          arrayForm.clear();

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
        summary: 'Course Content is empty',
        detail: 'Please upload Course Video Content.  !!',
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
