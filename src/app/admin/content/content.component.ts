import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewChildren, } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  styles: [`
        :host ::ng-deep button {
            margin-right: .25em;
        }
  `],
  providers: [ConfirmationService, MessageService]
})
export class ContentComponent implements OnInit, OnDestroy {
  @ViewChild('vid', { read: ElementRef }) tempRef!: ElementRef;

  private contentGetSubsription$: Subscription = new Subscription();
  private contentPostSubsription$: Subscription = new Subscription();
  private contentUpdateSubsription$: Subscription = new Subscription();
  private contentDeleteSubsription$: Subscription = new Subscription();
  private fileUploadForPostSubscription$: Subscription = new Subscription();
  private fileUploadForUpdateSubscription$: Subscription = new Subscription();
  private allSubsription$: Subscription[] = []

  loadingSpinner: boolean = false;
  contentFileData: string[] = [];
  contentUpdateFileData: string[] = [];
  display: boolean = false;
  editDisply: boolean = false;
  contentData!: any;
  totalCourse: number = 0;
  public _id!: string;
  public items: any
  _data!: any;
  formData = new FormData();
  percentage: number = 0;

  isProgressFile: boolean = false;




  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  url: string = "";
  updateContent!: {}
  contentBody!: {};
  editContentBody!: {};
  bodyData!: {};
  edit!: {}
  cId!: string | null;

  courseGroup!: FormGroup;

  courseUpdateGroup!: FormGroup;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.getContent();
    this.courseValidate();
    this.courseUpdateValidate();
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
      title: new FormControl('', [Validators.required, Validators.minLength(8), Validators.min(1)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      price: new FormControl('', [Validators.required, Validators.minLength(2)]),
      img: new FormControl('', Validators.nullValidator)
    });
  }

  // update validations
  public courseUpdateValidate(): void {
    this.courseUpdateGroup = this.fb.group({
      title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.min(1)]),
      description: new FormControl("", [Validators.required, Validators.minLength(10)]),
      price: new FormControl('', [Validators.required, Validators.minLength(2)]),
      img: new FormControl('', [Validators.nullValidator])
    });
  }

  // get content
  public getContent(): void {
    this.loadingSpinner = true;
    this.contentGetSubsription$ = this.apiService.getContent().subscribe((res) => {
      try {
        this.contentData = res.data;
        console.log(this.contentData);
        this.totalCourse = this.contentData.length;
        this.loadingSpinner = false;
      } catch (error) {
        this.messageService.add({
          severity: 'error', summary: 'Error !!', detail: 'Something went wrong !!'
        });
      }
      this.allSubsription$.push(this.contentGetSubsription$);
    });
  }

  public setContentData(data: any): void {
    localStorage.setItem('contentData', JSON.stringify(data));
  }

  // content upload
  public onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.courseGroup.get('img')?.setValue(file);
      const formData = new FormData();
      formData.append('files', this.courseGroup.get('img')?.value);
      this.isProgressFile = true;
      this.fileUploadForPostSubscription$ = this.apiService.uploadFile(formData).subscribe(res => {
        try {
          this.isProgressFile = false;
          console.log(res);
          this.contentFileData = res;
        } catch (error) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went to wrong !!' });
        }
        this.allSubsription$.push(this.fileUploadForPostSubscription$);
      });
    }
  }

  // content upload
  public onFileSelectForUpdate(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.courseUpdateGroup.get('img')?.setValue(file);
      //  this.formData = new FormData();
      this.formData.append('files', this.courseUpdateGroup.get('img')?.value);
      this.fileUploadForUpdateSubscription$ = this.apiService.uploadFile(this.formData).subscribe(res => {
        try {
          console.log(res);
          this.contentUpdateFileData = res;
        } catch (error) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went to wrong !!' });
        }
        this.allSubsription$.push(this.fileUploadForUpdateSubscription$)
      });
    }
  }

  // On submit content
  public onSubmitContent(): void {
    const author = localStorage.getItem('role')
    this.contentBody = {
      "data": {
        "name": this.courseGroup.value.title,
        "description": this.courseGroup.value.description,
        "author": author,
        "price": this.courseGroup.value.price,
        "media": this.contentFileData
      }
    }
    // Post api call here
    this.contentPostSubsription$ = this.apiService.postContent(this.contentBody).subscribe(res => {
      console.log(res);
      try {
        this.display = false;
        this.messageService.add({
          severity: 'success', summary: 'Success', detail: 'Content added successfully !!'
        });
        this.getContent();

      } catch (error) {

        this.messageService.add({
          severity: 'error', summary: 'Error', detail: 'Something went wrong !!'
        });
      }
      this.allSubsription$.push(this.contentPostSubsription$);
    });
  }

  // Edit dialog open
  public editContentDialog(item: any): void {
    console.log('edit', item.attributes.media.data[0].attributes);
    this._data = item;
    this.courseUpdateGroup = this.fb.group({
      title: new FormControl(item.attributes.name, [Validators.required, Validators.minLength(5), Validators.min(1)]),
      description: new FormControl(item.attributes.description, [Validators.required, Validators.minLength(10)]),
      price: new FormControl(item.attributes.price, [Validators.required, Validators.minLength(1)]),
      img: new FormControl('', [Validators.nullValidator])
    });
    this.editDisply = true;
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
        "data": {
          "name": this.courseUpdateGroup.value.title,
          "description": this.courseUpdateGroup.value.description,
          "author": this._data.attributes.author,
          "price": this.courseUpdateGroup.value.price,
          "media": this._data.attributes.media.data[0]
        }
      }
    } else {
      this.editContentBody = {
        "data": {
          "name": this.courseUpdateGroup.value.title,
          "description": this.courseUpdateGroup.value.description,
          "author": this._data.attributes.author,
          "price": this.courseUpdateGroup.value.price,
          "media": this.contentUpdateFileData
        }
      }
    }

    // Post api call here
    this.contentUpdateSubsription$ = this.apiService.updateContent(this._data.id, this.editContentBody).subscribe(res => {
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
      this.allSubsription$.push(this.contentUpdateSubsription$);
    });
  }

  // Delete content
  public deleteDialog(data: any): void {
    this.confirmationService.confirm({
      message: `Do you want to delete - ${data.attributes.name} ?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.contentDeleteSubsription$ = this.apiService.deleteContent(data.id).subscribe(res => {
          try {
            this.messageService.add({
              severity: 'error', summary: 'Delete', detail: 'Content deleted successfully !'
            });
            this.getContent();
          } catch (error) {
            this.messageService.add({
              severity: 'error', summary: 'Error', detail: 'Something went to wrong !!'
            });
          }
          this.allSubsription$.push(this.contentDeleteSubsription$);
        });
      },
      reject: () => { }
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
