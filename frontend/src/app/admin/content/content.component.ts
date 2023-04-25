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
import { ContentData, Content, ContentResponse } from 'src/app/models/content';
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

  // @ViewChild('v1', { read: ElementRef, static: false }) videoPlayer!: ElementRef;
  loadingSpinner: boolean = false;
  contentFileData: string[] = [];
  contentUpdateFileData: string[] = [];
  display: boolean = false;
  editDisply: boolean = false;

  contentData!: ContentResponse[];
  totalCourse: number = 0;
  public _id!: string;
  _data: any ;
  formData = new FormData();
  percentage: number = 0;

  isProgressFile: boolean = false;

  url: string = '';
  updateContent!: {};
  editContentBody!: Content;
  bodyData!: {};
  edit!: {};
  cId!: string | null;

  courseGroup!: FormGroup;

  courseUpdateGroup!: FormGroup;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getContent();
    this.courseValidate();
    this.courseUpdateValidate();
  }

  ngAfterViewInit(): void {
    // console.log('afetr init', this.tempRef);
    // if (this.tempRef) {
    //   console.log('afetr init', this.tempRef.nativeElement);
    //   this.tempRef?.nativeElement.addEventListener('timeupdate', (event: any) => {
    //     this.trackVideoProgress(event);
    //     console.log(event);
    //   });
    // }
  }

  updateProgress(vid: HTMLVideoElement) {
    const progress = (vid.currentTime / vid.duration) * 100;
    this.percentage = Math.round(progress);
    console.log(this.percentage, '%');
  }

  // onClick(id: string): void {
  //   localStorage.setItem('cId', id);
  // }
  trackVideoProgress(event: any) {
    const video = event.target;
    const duartionPercentage = (video.currentTime / video.duration) * 100;
    // console.log(duartionPercentage);
    this.percentage = Math.ceil(duartionPercentage);
    console.log(`Video progress: ${this.percentage}%`);
  }

  public showDialog(): void {
    this.display = true;
  }
  public closeDialog(): void {
    this.display = false;
  }

  public onLogout(): void {
    this.router.navigateByUrl('/login');
    localStorage.clear();
    location.reload();
  }

  // form validation
  public courseValidate(): void {
    this.courseGroup = this.fb.group({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.min(1),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      img: new FormControl('',[Validators.required]),
      author: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  // update validations
  public courseUpdateValidate(): void {
    this.courseUpdateGroup = this.fb.group({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.min(1),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      img: new FormControl('', [Validators.nullValidator]),
      author: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  // get content
  public getContent(): void {
    this.loadingSpinner = true;
    this.apiService.getContent().subscribe((res) => {
      try {
        console.log(res.data);
        console.log(res);

        this.contentData = res.data;
        console.log(this.contentData);
        // this.totalCourse = this.contentData.data.length;
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


  // content upload
 // content upload
 public onFileSelect(event: any): void {
  console.log(event.target.files);

  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.courseGroup.get('img')?.setValue(file);
    const formData = new FormData();
    formData.append('files', this.courseGroup.get('img')?.value);
    this.isProgressFile = true;

    this.apiService.uploadFile(formData).subscribe(res => {
      try {
        this.isProgressFile = false;
        console.log(res);
        this.contentFileData = res;
      } catch (error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went to wrong !!' });
      }
    });
  }
}

  // content upload
  public onFileSelectForUpdate(event: any): void {
    console.log(event.target.files.length);

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log(file);

      this.courseUpdateGroup.get('img')?.setValue(file);
       this.formData = new FormData();
      console.log(this.courseUpdateGroup.get('img')?.value);

      this.formData.append('files', this.courseUpdateGroup.get('img')?.value);

      this.apiService.uploadFile(this.formData).subscribe((res) => {
        try {
          console.log(res);
          this.contentUpdateFileData = res;
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

  // On submit content
  public onSubmitContent(): void {
    // const author = localStorage.getItem('role');
    const contentBody: Content = {
      data: {
        name: this.courseGroup.value.title,
        description: this.courseGroup.value.description,
        author: this.courseGroup.value.author,
        price: this.courseGroup.value.price,
        media: this.contentFileData,
      },
    };

    console.log(contentBody);

    // Post api call here
    this.apiService.postContent(contentBody).subscribe((res) => {
      console.log(res);
      try {
        this.display = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Content added successfully !!',
        });
        this.getContent();

        this.courseGroup.reset();
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong !!',
        });
      }
    });
    this.display = false;
    this.courseGroup.reset();
  }

  // Edit dialog open
  public editContentDialog(item: any): void {
    console.log('edit', item);
    this._data = item;
    console.log('media',this._data.attributes.media.data[0]);

const media = this._data.attributes.media.data[0]
    this.courseUpdateGroup = this.fb.group({
      title: new FormControl(item.attributes.name, [
        Validators.required,
        Validators.minLength(5),
        Validators.min(1),
      ]),
      description: new FormControl(item.attributes.description, [
        Validators.required,
        Validators.minLength(10),
      ]),
      price: new FormControl(item.attributes.price, [
        Validators.required,
        Validators.minLength(1),
      ]),
      author: new FormControl(item.attributes.author, [
        Validators.required,
        Validators.minLength(3),
      ]),
      img: new FormControl(media.attributes.formats.thumbnail.url, [Validators.nullValidator]),
    });
    this.editDisply = true;
    console.log(this.courseUpdateGroup.value);

  }

  // close edit dialog
  public closeEditDialog(): void {
    this.editDisply = false;
  }


  // update content
  public onUpdateContent(): void {
    this.editDisply = false;

    if (this.contentUpdateFileData?.length == 0) {
      this.editContentBody = {
        data: {
          name: this.courseUpdateGroup.value.title,
          description: this.courseUpdateGroup.value.description,
           author: this.courseUpdateGroup.value.author,
          price: this.courseUpdateGroup.value.price,
           media: this._data.attributes.media.data[0]
        },
      };
      console.log(this.editContentBody);

    } else {
      this.editContentBody = {
        data: {
          name: this.courseUpdateGroup.value.title,
          description: this.courseUpdateGroup.value.description,
          author: this.courseUpdateGroup.value.author,
          price: this.courseUpdateGroup.value.price,
          media: this.contentUpdateFileData,
        },
      };
      console.log(this.editContentBody);

    }

    // Post api call here

    this.apiService.updateContent(this._data.id, this.editContentBody).subscribe(res => {
      console.log(res);
      try {
        this.editDisply = false;
        this.messageService.add({
          severity: 'info', summary: 'Update', detail: 'Content updated successfully !!'
        });
        this.getContent();
      } catch (error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Somthing went to wrong !!' })
      }
    });
  }



  // Delete content
  public deleteDialog(data: ContentResponse): void {
    this.confirmationService.confirm({
      message: `Do you want to delete - ${data.attributes?.name} ?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.apiService.deleteContent(data.id).subscribe((res) => {
          console.log(res);
          console.log(data.id);

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
