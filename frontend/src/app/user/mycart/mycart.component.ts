import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import {
  MessageService,
  ConfirmationService,
  ConfirmEventType,
} from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';
import { AboutService } from 'src/app/services/about.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.scss'],
  providers: [DialogService, MessageService, ConfirmationService],
})
export class MycartComponent implements OnInit {
  courseData: any[] = [];
  userID!: number;
  userLibId: number[] = [];
  purchases!: number;
  totalAmount: number = 0;

  constructor(
    private router: Router,
    private apiservice: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private aboutService: AboutService
  ) {}
  ngOnInit(): void {
    this.getLocalStoredData();
    this.getCartCourse();
    this.gettingUserHasCourse();

  }

  public getLocalStoredData() {
    const localStoredData = JSON.parse(localStorage.getItem('user')!);
    this.userID = localStoredData.id;
  }

  public getCartCourse(): void {
    this.apiservice.getUserCart(this.userID).subscribe((res) => {
      res.map((cartRes: any) => {
        if (cartRes.course_ids.length == 0) {
          this.apiservice.deleteCartItem(cartRes.id).subscribe();
        }
      });
      this.courseData = res;

      // console.log(this.courseData[0]?.course_ids[0].rating);


      this.aboutService.userCartLength(res.length);
      this.courseData.map((res) => {
        if (res.course_ids[0]?.price != 0) {
          this.totalAmount =
            Number(res.course_ids[0]?.price) + Number(this.totalAmount);
        }
      });
    });
  }

  public gettingUserHasCourse(): void {
    this.apiservice.getUserCourse(this.userID).subscribe((res) => {
      res.map((resObj: any) => {
        this.userLibId.push(resObj.course_ids[0]?.id);
        this.userLibId = [...new Set(this.userLibId)];
      });
    });
  }

  public courseDetails(courseId: number): void {
    this.router.navigate(['course/', courseId]);
  }

  addToLibrary(course: any) {

    this.purchases = course.course_ids[0].no_of_purchases;
    this.confirmationService.confirm({
      message: `Do you want to add this ${course?.course_ids[0].name} to Library?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const courseDetails = {
          data: {
            course_ids: course.course_ids[0].id,
            user_id: this.userID,
          },
        };

        this.apiservice.postUserHasCourse(courseDetails).subscribe((res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successfully',
            detail: 'Course added to library',
          });

          this.gettingUserHasCourse();

          const putCourseBody = {
            data: {
              no_of_purchases: Number(this.purchases) + Number(1),
            },
          };
          this.apiservice
            .updateContent(course.course_ids[0].id, putCourseBody)
            .subscribe((res) => {});
        });
        this.apiservice.deleteCartItem(course.id).subscribe((res: any) => {});
        location.reload();
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

  // Removing Course form Cart
  public removeCourse(id: number): void {
    this.confirmationService.confirm({
      message: `Do you want to remove this Course from Cart?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apiservice.deleteCartItem(id).subscribe((res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Course has been removed from Cart',
          });
          this.getCartCourse();
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
