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
import { environment } from 'src/environment/environment';
import { CourseData } from 'src/app/models/library';
import { CartResponse } from 'src/app/models/cart';

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
  public img_url = environment.apiUrl;

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
  public onClick(course: any) {
    this.router.navigate(['/course/', course.id]);
  }

  public getCartCourse(): void {
    this.totalAmount = 0;
    this.apiservice.getUserCart(this.userID).subscribe((res) => {
      res.map((cartRes: CartResponse) => {
        if (cartRes.course_ids.length == 0) {
          this.apiservice.deleteCartItem(cartRes.id).subscribe();
        }
      });
      this.courseData = res;
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
      res.map((resObj: CourseData) => {
        this.userLibId.push(resObj.course_ids[0]?.id);
        this.userLibId = [...new Set(this.userLibId)];
      });
    });
  }

  public courseDetails(courseId: number): void {
    this.router.navigate(['course/', courseId]);
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
