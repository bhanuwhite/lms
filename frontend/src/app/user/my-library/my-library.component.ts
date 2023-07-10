import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import {ConfirmationService,MessageService,ConfirmEventType,} from 'primeng/api';
import { AboutService } from 'src/app/services/about.service';
import { CourseData } from 'src/app/models/library';
import { environment } from 'src/environment/environment';

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
  public searchData: CourseData[]=[];
  public courseData: CourseData[] = [];

  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private aboutService: AboutService
  ) {}

  ngOnInit(): void {
    this.getLocalData();
    this.gettingUserHasCourse();
    this.getCartCourse();
  }

  public img_url = environment.apiUrl ;

  public getCartCourse(): void {
    this.apiService.getUserCart(this.userID).subscribe((res) => {
      this.aboutService.userCartLength(res.length);
    });
  }

  public getLocalData(): void {
    const getLocalData = JSON.parse(localStorage.getItem('user')!);
    this.userID = getLocalData.id;
  }

  public gettingUserHasCourse(): Promise<void> {
    this.courseData=[]
    return new Promise((resolve, reject) => {
      this.apiService.getUserCourse(this.userID).subscribe((res) => {

        if (res.length != 0) {
          res.map((courseRes: any) => {
            if (courseRes.course_ids.length != 0) {
              this.courseData.push(courseRes);

            }
          });
          resolve();
        } else {
          this.courseData = res;
        }

        this.searchData = this.courseData;
        this.Spinner = false;
      });
    });
  }



  filterCourseData(): void {
    if (this.searchWord) {
      this.courseData = this.searchData.filter(
        (course: any) =>
          course?.course_ids[0]?.name
            .toLowerCase()
            .includes(this.searchWord.toLowerCase()) ||
          course?.course_ids[0]?.description
            .toLowerCase()
            .includes(this.searchWord.toLowerCase())
      );
    } else {
      this.courseData = this.searchData;
    }
  }


  public removeCourse(id:number): void{

          this.confirmationService.confirm({
            message: `Do you want to delete this course from your Library?`,
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
              this.apiService.deleteUserHasCourse(id).subscribe((res) => {
                try {
                  this.gettingUserHasCourse();
                  this.messageService.add({ severity: 'success', summary: 'Successfully', detail: 'Deleted sucessfully' });
                } catch (error) {
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went to wrong' });
                }
              })
            },
            reject: () => {
              this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected' });
            }

          })
  }


}
