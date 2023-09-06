import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  constructor() {}
  courseObj: any = {};
  purchasingCourse(purchaseCourse: any) {
    this.courseObj = purchaseCourse;
  }

  invoiceCourseObj: any = {};
  invoice(invoiceCourse: any) {
    this.invoiceCourseObj = invoiceCourse;
  }
}
