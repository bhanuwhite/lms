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
} from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import {
  CoursesDataObj,
  TotalCoursesData,
  CourseResData,
  UpdateCourseObj,
  PostCourseData,
  CoursesAttributes,
} from 'src/app/models/Courses';
import { mediaDataObj } from 'src/app/models/content';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  providers: [MessageService, ConfirmationService],
})
export class CoursesComponent implements OnInit, OnDestroy {
  courseGetSubscription$: Subscription = new Subscription();
  coursePostSubscription$: Subscription = new Subscription();
  courseUpdateSubscription$: Subscription = new Subscription();
  courseDeleteSubscription$: Subscription = new Subscription();
  courseFileUploadSubscription$: Subscription = new Subscription();
  courseAssignUploadSubscription$: Subscription = new Subscription();
  courseUpdateFileUploadSubscription$: Subscription = new Subscription();
  courseUpdateAssignUploadSubscription$: Subscription = new Subscription();
  subScription$: Subscription[] = [];
  data!: string | null;
  addFormGroup!: FormGroup;
  editFormGroup!: FormGroup;
  courseFileData!: number | undefined;
  assignFileData!: number | undefined;
  updateAssignFileData!: number ;
  updateFileData!: number;
  courseData: CourseResData[] = [];
  editData!: CoursesDataObj;
  addDialogDisplay: boolean = false;
  editDialogDisplay: boolean = false;
  courseBody!: PostCourseData;
  editCourseBody!: UpdateCourseObj;
  isLoading: boolean = false;
  @ViewChild('SelectCourseFileData') inputFileData!: ElementRef;
  @ViewChild('assignmentCourseFile') assignmentCourseFile!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCourses();
    this.addFormValidation();
    this.editFormValidation();
  }

  public addFormValidation(): void {
    this.addFormGroup = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      courseFile: new FormControl('', Validators.nullValidator),
      assignFile: new FormControl('', Validators.nullValidator),
    });
  }

  public editFormValidation(): void {
    this.editFormGroup = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      courseFile: new FormControl('', Validators.nullValidator),
      assignFile: new FormControl('', Validators.nullValidator),
    });
  }

  public onFileSelect(event: Event): void {
    const inputElement = event.target as HTMLInputElement | null;
    if (inputElement?.files?.length) {
      const file = inputElement.files[0];
      this.addFormGroup.get('courseFile')?.setValue(file);
      const formData = new FormData();
      formData.append('files', this.addFormGroup.get('courseFile')?.value);
      console.log('form Data', formData);

      this.courseFileUploadSubscription$ = this.apiService
        .uploadFile(formData)
        .subscribe((res) => {
          try {
            this.courseFileData = res[0].id;
            console.log('courseFileData', this.courseFileData);
          } catch (error) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Something went to wrong !!',
            });
          }
        });
      this.subScription$.push(this.courseFileUploadSubscription$);
    }
  }

  public onAssignFileSelect(event: Event): void {
    const inputElement = event.target as HTMLInputElement | null;
    if (inputElement?.files?.length) {
      const file = inputElement.files[0];
      this.addFormGroup.get('assignFile')?.setValue(file);
      const formData = new FormData();
      formData.append('files', this.addFormGroup.get('assignFile')?.value);
      this.courseAssignUploadSubscription$ = this.apiService
        .uploadFile(formData)
        .subscribe((res) => {
          try {
            this.assignFileData = res[0].id;
            console.log('assignFileData', this.assignFileData);
          } catch (error) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Something went to wrong',
            });
          }
        });
      this.subScription$.push(this.courseAssignUploadSubscription$);
    }
  }

  public onUpdateFileSelect(event: Event): void {
    const inputElement = event.target as HTMLInputElement | null;
    if (inputElement?.files?.length) {
      const file = inputElement.files[0];
      this.editFormGroup.get('courseFile')?.setValue(file);
      const formData = new FormData();
      formData.append('files', this.editFormGroup.get('courseFile')?.value);
      this.courseUpdateFileUploadSubscription$ = this.apiService
        .uploadFile(formData)
        .subscribe((res) => {
          try {
            this.updateFileData = res[0].id;
          } catch (error) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Something went to wrong',
            });
          }
        });
      this.subScription$.push(this.courseUpdateFileUploadSubscription$);
    }
  }

  public onUpdateAssignFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      this.editFormGroup.get('assignFile')?.setValue(file);
      const formData = new FormData();
      formData.append('files', this.editFormGroup.get('assignFile')?.value);

      this.courseUpdateAssignUploadSubscription$ = this.apiService
        .uploadFile(formData)
        .subscribe((res) => {
          try {
            this.updateAssignFileData = res[0].id;
          } catch (error) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Something went to wrong',
            });
          }
        });
      this.subScription$.push(this.courseUpdateAssignUploadSubscription$);
    }
  }

  // Get courses
  public getCourses(): void {
    this.isLoading = true;
    this.courseGetSubscription$ = this.apiService
      .getCourses()
      .subscribe((res) => {
        try {
          console.log(res.data);

          this.courseData = res.data;
          this.searchData = res.data;
          console.log(this.courseData);
          this.isLoading = false;
        } catch (error) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong !!',
          });
        }
      });
    this.subScription$.push(this.courseGetSubscription$);
  }

  public addDialog(): void {
    this.addDialogDisplay = true;
    this.inputFileData.nativeElement.value = null;
    this.assignmentCourseFile.nativeElement.value = null;
  }

  public closeAddDialog(): void {
    this.addDialogDisplay = false;
  }

  public onSubmit(): void {
    this.courseBody = {
      data: {
        assignment: this.assignFileData,
        courseContent: this.courseFileData,
        courseDescription: this.addFormGroup.value.description,
        title: this.addFormGroup.value.title,
      },
    };
console.log(this.courseBody.data);

    this.coursePostSubscription$ = this.apiService
      .postCourse(this.courseBody)
      .subscribe((res) => {
        try {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Course Added successfully !',
          });
          this.getCourses();
        } catch (error) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went to wrong !!',
          });
        }
        this.addDialogDisplay = false;
        this.subScription$.push(this.coursePostSubscription$);
      });
    // this.addFormGroup.get('courseFile')?.setValue(null);
    // this.addFormGroup.get('assignFile')?.setValue(null);
    // this.assignFileData=[]
    // this.courseFileData=[]
    this.assignFileData= undefined;
      this.courseFileData = undefined
    this.addFormGroup.reset();

  }

  public editDialog(data: CoursesDataObj): void {
    this.editData = data;
    this.editFormGroup = this.fb.group({
      title: new FormControl(data.attributes.title, [Validators.required]),
      description: new FormControl(data.attributes.courseDescription, [
        Validators.required,
      ]),
      courseFile: new FormControl('', Validators.nullValidator),
      assignFile: new FormControl('', Validators.nullValidator),
    });
    this.editDialogDisplay = true;
  }

  public closeEditDialog(): void {
    this.editDialogDisplay = false;
  }

  public onUpdate(): void {
    if (this.updateFileData == undefined) {
      this.editCourseBody = {
        data: {
          assignment: this.updateAssignFileData,
          courseContent: this.editData.attributes.courseContent.data.id,
          courseDescription: this.editFormGroup.value.description,
          title: this.editFormGroup.value.title,
        },
      };
    } else if (this.updateAssignFileData == undefined) {
      this.editCourseBody = {
        data: {
          assignment: this.editData.attributes.assignment.data.id,
          courseContent: this.updateFileData,
          courseDescription: this.editFormGroup.value.description,
          title: this.editFormGroup.value.title,
        },
      };
    } else if (
      this.updateFileData == undefined &&
      this.updateAssignFileData == undefined
    ) {
      this.editCourseBody = {
        data: {
          assignment: this.editData.attributes.assignment.data.id,
          courseContent: this.editData.attributes.courseContent.data.id,
          courseDescription: this.editFormGroup.value.description,
          title: this.editFormGroup.value.title,
        },
      };
    } else {
      this.editCourseBody = {
        data: {
          assignment: this.updateAssignFileData,
          courseContent: this.updateFileData,
          courseDescription: this.editFormGroup.value.description,
          title: this.editFormGroup.value.title,
        },
      };
    }

    this.courseUpdateSubscription$ = this.apiService
      .updateCourse(this.editData.id, this.editCourseBody)
      .subscribe((res) => {
        try {
          this.getCourses();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Course updated successfully !',
          });
          location.reload();
        } catch (error) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went to wrong !!',
          });
        }
        this.subScription$.push(this.courseUpdateSubscription$);
      });
  }

  public deleteCourse(data: CourseResData): void {
    this.confirmationService.confirm({
      message: `Do you want to delete - ${data.attributes?.title} ?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.courseDeleteSubscription$ = this.apiService
          .deleteCourse(data.id)
          .subscribe((res) => {
            try {
              this.getCourses();
              this.messageService.add({
                severity: 'error',
                summary: 'Delete',
                detail: 'Deleted successfully !',
              });
            } catch (error) {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Something went wrong !!',
              });
            }
            this.subScription$.push(this.courseDeleteSubscription$);
          });
      },
      reject: () => {},
    });
  }

  goDetailPage(data: CourseResData) {
    this.router.navigateByUrl(`/admin/courses/${data.id}`);
  }

  public searchData!: any[];
  searchWord: string = '';
  public searchFun() {
    this.courseData = this.searchData.filter((course:any) => course.attributes.title.toLowerCase().includes(this.searchWord.toLowerCase()));
    console.log(this.searchWord);
  }

  ngOnDestroy(): void {
    this.subScription$.forEach((subScribe) => {
      subScribe.unsubscribe();
    });
  }
}
