import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from 'primeng/api';
import { dropDown } from 'src/app/interface';
import { ApiService } from 'src/app/services/api.service';
import { userLibrary } from 'src/app/models/content';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import {
  LibraryObjectData,
  UserLibraryGetResponseData,
} from 'src/app/models/user-library';
@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class MyLibraryComponent implements OnInit {
  // items!: MenuItem[];
  Spinner: boolean = true;
  searchWord: string = '';
  public value: number = 10;
  public progressValue: number = 0;

  courseDetailsJSON = '../../assets/course_details/courseDetails.json';
  public recentlyAccessDropdown: dropDown[] = [];
  public selectedRecentlyAccess: string = '';
  public categoryDropdown: dropDown[] = [];
  public selectedCategory: string = '';
  public progressDropdown: dropDown[] = [];
  public selectedProgress: string = '';
  public instructorDropdown: dropDown[] = [];
  public selectedInstructor: string = '';
  loadingSpinner: boolean = false;
  public searchData:any;
  public courseData: UserLibraryGetResponseData[] = [];
  public courseDetails: userLibrary[] = [];

  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getContentLibrary();
  }

  public getContentLibrary() {
    this.loadingSpinner = true;
    this.apiService.getContentLibrary().subscribe((res) => {
      try {
        this.courseData = res.data;
        console.log(this.courseData);
        this.searchData = res.data;
        this.Spinner = false;
        this.loadingSpinner = true;
        this.loadingSpinner = true;
      } catch (error) {
        console.log(error);
      }
    });
  }
  public searchFun() {
    this.courseData = this.searchData.filter((course: any) =>
      course.attributes?.content_library?.data.attributes.name
        .toLowerCase()
        .includes(this.searchWord.toLowerCase())
    );
    console.log(this.courseData);

  }

  public removeCourse(id: number) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this course from your Library?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.apiService.removeLibraryCourse(id).subscribe((res) => {
          console.log(res);
          this.getContentLibrary();
        });
        this.messageService.add({
          severity: 'success',
          summary: 'Successfully',
          detail: 'Course removed',
        });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
  }
}
