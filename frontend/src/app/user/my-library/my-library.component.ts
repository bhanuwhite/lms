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
@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class MyLibraryComponent implements OnInit {
  public Spinner: boolean = true;
  public searchWord: string = '';
  public userID!: number;
  public loadingSpinner: boolean = false;
  public searchData: any;
  public courseData: any;
  public courseDetails: userLibrary[] = [];

  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getLocalData();
    this.getContentLibrary();
    this.getTrackAPI();
  }

  public getLocalData(): void {
    const getLocalData = JSON.parse(localStorage.getItem('user')!);
    console.log(getLocalData);
    this.userID = getLocalData.id;
    console.log(this.userID);
  }

  libraryObjData:any
  public getContentLibrary(): void {
    this.loadingSpinner = true;
    this.apiService.getContentLibrary().subscribe((res) => {
      try {
        console.log(res);
        this.libraryObjData = res.find((objData:any)=> objData.id == this.userID )
        console.log("Library data", this.libraryObjData);

        // this.courseData = res.data;
        // console.log(this.courseData);
        // this.searchData = res.data;
        this.Spinner = false;
        this.loadingSpinner = true;
      } catch (error) {
        console.log(error);
      }
    });
  }

  public getTrackAPI(): void {
    this.apiService.getTrack().subscribe((res) => {
      console.log('track response', res);
    });
  }

  // get rating
  public userRating(event: any) {
    console.log('user rating', event.target);
  }

  filterCourseData(): void {
    if (this.searchWord) {
      this.courseData = this.searchData.filter(
        (course: any) =>
          // console.log(course)

          course.attributes.course_content.data.attributes.name
            .toLowerCase()
            .includes(this.searchWord.toLowerCase()) ||
          course.attributes.course_content.data.attributes.description
            .toLowerCase()
            .includes(this.searchWord.toLowerCase())
      );
    } else {
      // If search term is empty, reset the courseData array to show all data
      this.courseData = this.searchData;
    }
  }

  public removeCourse(id: number): void {
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
