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
  courseDocument: any;
  updateCertificates: boolean = false;
  updateDocuments: boolean = false;
  editUserLearnings: { u_learn: string }[] = [];

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
  // userLearnings!: FormArray;
  public newCourse() {
    this.addCourse = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z., ]+$'),
      ]),
      description: new FormControl(''),
      imgVideo: new FormControl(''),
      technology: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
      status: new FormControl({ status: 'active' }),
      admin_id: new FormControl(this.Admin_id),
      price: new FormControl(''),
      image: new FormControl(''),
      course_duration: new FormControl(),
      level: new FormControl(''),
      link: ['', [Validators.pattern('^https?://.+')]],
      userLearnings: this.fb.array([this.user_learn()]),
      coursesIncludes: this.fb.array([]),
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
  totalAvgRating :number | null =0;
  sum :number=0;
  ratingData:any
  // Get Content

  public getContent(): void {
    this.loadingSpinner = true;
    this.apiService.getContent().subscribe((res: AllCourseContent) => {
      try {
        this.contentData = res.data;
        this.contentData2 = res.data;
        this.loadingSpinner = false;

        for (let i = 0; i < this.contentData.length; i++) {


          this.apiService.getUserRatings(this.contentData[i].id).subscribe((res:any)=>{


            for (let j = 0; j < res.length; j++) {

              this.sum = res[j].rating + this.sum;

            }


            this.totalAvgRating = (this.sum /  res.length);
            if (
              isNaN(this.totalAvgRating) ||
              this.totalAvgRating === Infinity ||
              this.totalAvgRating === -Infinity
            ) {
              this.totalAvgRating = null;
            }


           this.ratingData ={
            data:{
              rating:this.totalAvgRating?.toFixed(0)
            }
           }

            this.apiService.updateContent(this.contentData[i].id, this.ratingData).subscribe((res)=>{

            })


            this.sum =  0
          })
         }






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
  public statusSelected2(event: { value: { status: string } }) {
    this.updatedStatus = event.value.status;
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
  public editcheckWordCount(): void{
    const textString =  this.courseUpdateGroup.value.description;
    console.log(textString);
  }

  public editcheckWord(description:any): void{


    this.remainingWords = 100 - description.split(" ").length;
    console.log(this.remainingWords);

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

  public courseFormSubmit(
    videoInput: HTMLInputElement,
    imgInput: HTMLInputElement
  ) {
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
        user_learning: this.addCourse.value.userLearnings,
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

  public categories: any = [
    { name: 'Certificate', checked: false },
    { name: 'Documents', checked: false },
  ];

  // Edit dialog open

  checkArray: any[] = [];
  public editContentDialog(item: AllCourseContentData): void {
    this.checkArray = item.attributes.course_include;
    this.categories.map((res: any) => {
      res.checked = false;
    });

    this.checkArray.forEach((value) => {
      const category = this.categories.find((c: any) => c.name === value);
      if (category) {
        category.checked = true;

        if ('certificate' === category.name.toLocaleLowerCase()) {
          this.updateCertificates = true;
        } else if ('documents' === category.name.toLocaleLowerCase()) {
          this.updateDocuments = true;
          this.showDocuments = true;
        }
      } else {
        this.updateCertificates = false;
        this.updateDocuments = false;
        this.showDocuments = false;
      }
    });

    this.editDisply = true;
    this._data = item;
    console.log(this._data.id);

    this.techString = item.attributes?.technology;
    this.subjectString = item.attributes?.subject;
    this.levelString = item.attributes?.level;
    this.statusString = item.attributes?.status;
    this.videoContent = item.attributes?.content;
    this.imageContent = item.attributes?.placeholder_img;

    this.courseUpdateGroup = this.fb.group({
      name: new FormControl(item.attributes?.name, [
        Validators.required,
        Validators.pattern('^[a-zA-Z., ]+$'),
      ]),
      description: new FormControl(item.attributes?.description),
      price: new FormControl(item.attributes?.price),
      technology: [{ tech: this.techString }],
      subject: [{ industry: this.subjectString }],
      level: [{ level: this.levelString }],
      link: new FormControl(item.attributes?.link),
      status: 'active',
      user_id: new FormControl(this.Admin_id),
      image: new FormControl(this.imageContent),
      imgVideo: new FormControl(this.videoContent),
      preLearn1: item.attributes.pre_learning[1],
      preLearn2: item.attributes.pre_learning['2'],
      preLearn3: item.attributes.pre_learning['3'],
      preLearn4: item.attributes.pre_learning['4'],

      coursesIncludes: this.fb.array(
        this.categories
          .filter((category: any) => category.checked)
          .map((category: any) => new FormControl(category.name))
      ),
    });
    this.courseUpdateGroup.setControl('userLearnings', this.userLearns());
    this.editcheckWord(this.courseUpdateGroup.value.description);

//  console.log(this.courseUpdateGroup.value.description.length);





  }


  public userLearns(): FormArray {
    const formArray = this.fb.array([]);
    this.editUserLearnings.forEach((res) => {
      formArray.push(this.fb.control(res.u_learn));
    });
    return formArray;
  }


  // close edit dialog
  public closeEditDialog(): void {
    this.editDisply = false;
    this.updateCertificates = false;
    this.updateDocuments = false;
  }

  updateCheckBoxArray!: FormArray;

  editCheckboxValue(event: any, value: string) {
    console.log(event.checked);

    if (event instanceof HTMLInputElement && event.checked !== undefined) {
      const checked = event.checked;

      this.updateCheckBoxArray = this.courseUpdateGroup.controls[
        'coursesIncludes'
      ] as FormArray;
      console.log(this.updateCheckBoxArray.value);

      if (checked) {
        this.updateCheckBoxArray.push(new FormControl(value));

        console.log(this.updateCheckBoxArray.value);
      } else {
        let index = this.updateCheckBoxArray.controls.findIndex(
          (x) => x.value == value
        );
        if (index !== -1) {
          this.updateCheckBoxArray.removeAt(index);
        }
      }
      console.log(this.updateCheckBoxArray.value);
    }
    console.log(this.courseUpdateGroup.value.coursesIncludes);
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

        user_learnings: this.courseUpdateGroup.value.userLearnings,
        course_include: this.courseUpdateGroup.value.coursesIncludes,
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
            this.updateCertificates = false;
            this.updateDocuments = false;
            this.getContent();
          } catch (error) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Something went to wrong !!',
            });
          }
        });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Please upload Course Video C ontent',
      });
    }
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
