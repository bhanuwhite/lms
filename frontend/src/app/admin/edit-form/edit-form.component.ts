import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
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
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SingleCourseObj, mediaDocument, videoObj } from 'src/app/models/content';


@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class EditFormComponent implements OnInit, OnChanges {
  @Input() edituserLearnings: any;
  @Input() popupClick!: string;
  @Output() getcontent = new EventEmitter<any>();

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
  courseDocument!: mediaDocument;
  showDocuments: boolean = false;
  showimageFileData: boolean = true;
  showVideoFileData: boolean = true;
  imgSrc!:string;
  imageFileData!: string;
  selectedCourseIncludes: string[] = [];
  newVideosUpload:any[]=[]


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
    private messageService: MessageService,
    private sanitizer: DomSanitizer
  ) {
    this.popupForm = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z., ]+$'),
      ]),
      description: [''],
      price: ['',[Validators.required]],
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
    });
  }

  ngOnChanges(): void {
    this.visible = this.popupClick == 'edit' ? true : false;
    this.editFormVisible = this.popupClick == 'edit' ? true : false;
    this.editingCourseData();
    this.checkCourseIncludes();
    this.courseDoc();
  }

  ngOnInit(): void {
    this.editingCourseData();
    this.getLocalData();
    this.checkCourseIncludes();
  }

  public getLocalData() {
    const localData = JSON.parse(localStorage.getItem('user')!);
    this.Admin_id = localData.id;
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

  public categories: {name:string,checked:boolean}[] = [
    { name: 'Certificate', checked: false },
    { name: 'Documents', checked: false },
  ];

  checkCourseIncludes(): void {
    const controls = this.edituserLearnings.attributes.course_include.map(
      (option: any) => this.fb.control(true)
    );
    this.popupForm.setControl('courseIncludes', this.fb.array(controls));
  }

  editingCourseData() {
    console.log(this.edituserLearnings);

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
          this.imgSrc = res[0].formats.thumbnail.url;
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
                this.newVideosUpload= this.courseContentVideo
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

  public onInputChanged(data: Event, videoDescObj: videoObj) {
    const value = (data.target as HTMLTextAreaElement).value;

    console.log(data);
    console.log(videoDescObj);
    const videoDesc = {
      fileInfo: {
        alternativeText: value,
      },
    };
    this.apiService
      .uploadVideoDesc(videoDescObj.id, videoDesc)
      .subscribe((res) => {});
  }

  public getSafeFileUrl(fileData: string, fileType: string): SafeResourceUrl {
    const mimeType = this.getMimeType(fileType);
    const safeDataUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`data:${mimeType};base64,${fileData}`);
    return safeDataUrl;
  }

  private getMimeType(fileType: string): string {
    switch (fileType) {
      case 'pdf':
        return 'application/pdf';
      case 'csv':
        return 'text/csv';
      case 'txt':
        return 'text/plain';
      default:
        return '';
    }
  }



  public onUpdateContent(): void {
    const updateData = this.popupForm.value;
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
        course_include: this.selectedCourseIncludes,
        files: this.courseDocument,
      },
    };

    // Post api call here
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
            this.newVideosUpload=[]
          } catch (error) {
            this.messageService.add({
              severity: 'error',
              summary: 'Failed',
              detail: 'Content upload failed..!!',
            });
          }
        });

  }

  public courseDoc() {
    if (this.selectedCourseIncludes.includes('Documents')) {
      this.showDocuments = true;
    }
  }

 public checkboxValue(event: Event, value: string):void {
    const arrayForm = <FormArray>this.popupForm.get('coursesIncludes');
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      arrayForm.push(this.fb.control(value));

      if (!this.selectedCourseIncludes.includes(value)) {
        this.selectedCourseIncludes.push(value);
      }
      if (this.selectedCourseIncludes.includes('Documents')) {
        this.showDocuments = true;
      }
    } else {
      if (this.selectedCourseIncludes.includes(value)) {
        this.selectedCourseIncludes = this.selectedCourseIncludes.filter(
          (value: string) => value !== value
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
          console.log(this.courseDocument);

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
