import {
  AfterViewInit,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ContentComponent } from '../content/content.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';
import { AllCourseContentData } from 'src/app/models/content';
import { HttpClient } from '@angular/common/http';
import { flatMap } from 'rxjs';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class EditFormComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() edituserLearnings: any;
  @Input() popupClick: any;
  @Output()('getcontent') getcontent: EventEmitter<any> = new EventEmitter();
  @ViewChild(ContentComponent)
  EditClick!: ContentComponent;
  visible: boolean = true;
  editFormVisible: boolean = true;
  popupForm: FormGroup;
  remainingWords: number = 100;
  private Admin_id!: number;
  imgUploadProgress: boolean = false;
  public formData = new FormData();
  public courseContentImage: any;
  public selectedTech!: string;
  public selectedLevel!: string;
  public selectedSubject!: string;
  videoUploadProgress: boolean = false;
  courseContentVideo: any[] = [];
  allVideosDuration: number = 0;
  courseDocument: any;
  showDocuments: boolean = false;
  showimageFileData: boolean = true;
  showVideoFileData: boolean = true;
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
    public fb: FormBuilder,
    private apiService: ApiService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private http: HttpClient
  ) {
    this.popupForm = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z., ]+$'),
      ]),
      description: [''],
      price: [''],
      imgVideo: [''],
      technology: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
      level: [''],
      status: new FormControl('', [Validators.required]),
      link: [''],
      admin_id: [''],
      image: [''],
      course_duration: [''],
      courserIncludes: this.fb.array([]),
      documents: [''],
      preLearn1: [''],
      preLearn2: [''],
      preLearn3: [''],
      preLearn4: [''],
      userLearnings: this.fb.array([]),
    });
  }
  ngAfterViewInit(): void {
    // this.EditClick.editContentDialog;
  }

  ngOnChanges(): void {
    this.visible = this.popupClick == 'edit' ? true : false;
    this.editFormVisible = this.popupClick == 'edit' ? true : false;
    this.editingCourseData();
    this.patchValueData();
    this.checkCourseIncludes();
    this.courseDoc();
  }

  ngOnInit(): void {
    this.editingCourseData();
    this.patchValueData();
    this.getLocalData();
    this.checkCourseIncludes();
  }

  public getLocalData() {
    const localData = JSON.parse(localStorage.getItem('user')!);
    this.Admin_id = localData.id;
  }
  addUser(): FormArray {
    return this.popupForm.get('userLearnings') as FormArray;
  }
  removeUserLearning(index: number) {
    this.addUser().removeAt(index);
  }
  addUserLearning() {
    this.addUser().push(
      this.fb.group({
        u_learn: '',
      })
    );
  }
  patchValueData() {
    this.addUser().controls = [];
    let u_LearnObj = this.edituserLearnings.attributes.user_learning;
    let array = Object.entries(u_LearnObj).map(([key, u_learn]) => ({
      key,
      u_learn,
    }));
    array.forEach((userLearn: any) => {
      this.addUser().controls.push(
        this.fb.group({
          u_learn: userLearn.u_learn,
        })
      );
    });
  }

  cancelUpdate() {
    this.editFormVisible = false;
  }

  public checkWordCount(): void {
    const textValue = this.popupForm.controls['description'].value;
    const wordCount = textValue?.trim().split(/\s+/).length;
    this.remainingWords = 100 - wordCount;

    if (this.remainingWords < 0) {
      const words = textValue.trim().split(/\s+/);
      this.popupForm.controls['description'].setValue(
        words.slice(0, 100).join(' ')
      );
      this.remainingWords = 0;
    }
  }

  public categories: any = [
    { name: 'Certificate', checked: false },
    { name: 'Documents', checked: false },
  ];

  selectedCourseIncludes: string[] = [];
  checkCourseIncludes(): void {
    const controls = this.edituserLearnings.attributes.course_include.map(
      (option: any) => this.fb.control(true)
    );
    this.popupForm.setControl('courseIncludes', this.fb.array(controls));
  }

  imageFileData!: string;
  editingCourseData() {

    const formValues = this.edituserLearnings.attributes;

    this.imageFileData =  this.edituserLearnings.attributes.placeholder_img.data.attributes.name
    this.selectedCourseIncludes = formValues.course_include;
    this.popupForm = this.fb.group({
      name: formValues.name,
      description: formValues.description,
      price: formValues.price,
      imgVideo: formValues.content,
      technology: [{ tech: formValues.technology }],
      subject: [{ industry: formValues.subject }],
      level: [{ level: formValues.level }],
      status: 'active',
      link: formValues.link,
      admin_id: formValues.creator_id,
      image: formValues.placeholder_img,
      course_duration: formValues.total_duration,
      courserIncludes: this.fb.array([]),
      documents: formValues.files,
      preLearn1: formValues.pre_learning['1'],
      preLearn2: formValues.pre_learning['2'],
      preLearn3: formValues.pre_learning['3'],
      preLearn4: formValues.pre_learning['4'],
      userLearnings: this.fb.array([]),
    });
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

  public courseFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    this.imgUploadProgress = true;
    this.showimageFileData = false;
    if (target.files?.length) {
      const file = target.files[0];
      this.popupForm.get('imgVideo')?.setValue(file);
      this.formData = new FormData();
      this.formData.append('files', this.popupForm.value.imgVideo);

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

  public async courseFileSelect(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;
    const selectedFiles = Array.from(target.files || []);
    this.videoUploadProgress = true;
    this.showVideoFileData = false;
    this.courseContentVideo = [];
    const uploadPromises: Promise<any>[] = [];
    let currentUploadIndex = 0;
    selectedFiles.forEach((file) => {
      const uploadPromise = new Promise<void>((resolve, reject) => {
        this.popupForm.get('imgVideo')?.setValue(file);
        this.formData = new FormData();
        this.formData.append('files', this.popupForm.value.imgVideo);
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

  private userLearnObj: { [key: string]: string } = {};
  public onUpdateContent(): void {
    const updateData = this.popupForm.value;

    for (let i = 0; i < this.addUser().controls.length; i++) {
      this.userLearnObj[i] = this.addUser().controls[i].value.u_learn.u_learn
        ? this.addUser().controls[i].value.u_learn.u_learn
        : this.addUser().controls[i].value.u_learn;
    }

    const updateCourseData = {
      data: {
        technology: this.selectedTech,
        level: this.selectedLevel,
        subject: this.selectedSubject,
        content: this.courseContentVideo,
        description: updateData.description,
        link: updateData.link,
        name: updateData.name,
        placeholder_img: this.courseContentImage,
        price: updateData.price,
        user_id: this.Admin_id,
        status: 'active',
        pre_learning: {
          1: updateData.preLearn1,
          2: updateData.preLearn2,
          3: updateData.preLearn3,
          4: updateData.preLearn4,
        },
        user_learnings: this.userLearnObj,
        course_include: this.selectedCourseIncludes,
        files: this.courseDocument,
      },
    };

    // Post api call here
    if (this.courseContentVideo.length != 0) {
      this.apiService
        .updateContent(this.edituserLearnings.id, updateCourseData)
        .subscribe((res) => {
          try {
            this.messageService.add({
              severity: 'info',
              summary: 'Update',
              detail: 'Content updated successfully !!',
            });
            this.editFormVisible = false;
            this.getcontent.emit();
            this.showimageFileData = true;
            this.showVideoFileData = true;
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

  public courseDoc() {
    if (this.selectedCourseIncludes.includes('Documents')) {
      this.showDocuments = true;
    }
  }

  checkboxValue(event: any, value: string) {
    const arrayForm = <FormArray>this.popupForm.get('coursesIncludes');

    if (event?.target?.checked) {
      if (!this.selectedCourseIncludes.includes(event.target.value)) {
        this.selectedCourseIncludes.push(event.target.value);
      }
      if (this.selectedCourseIncludes.includes('Documents')) {
        this.showDocuments = true;
      }
    } else {
      if (this.selectedCourseIncludes.includes(event.target.value)) {
        this.selectedCourseIncludes = this.selectedCourseIncludes.filter(
          (value: string) => value !== event.target.value
        );
      }
      if (!this.selectedCourseIncludes.includes('Documents')) {
        this.showDocuments = false;
      }
    }
  }

  public courseDocSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files?.length) {
      const file = target.files[0];
      this.popupForm.get('documents')?.setValue(file);
      this.formData = new FormData();
      this.formData.append('files', this.popupForm.value.documents);

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
}
