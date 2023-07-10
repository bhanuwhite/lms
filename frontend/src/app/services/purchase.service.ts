import { Injectable } from '@angular/core';
import { courseDataObj } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor() { }

  courseObj: any = { }

  purchasingCourse(purchaseCourse:any) {
    console.log(purchaseCourse);

    this.courseObj = purchaseCourse;

  }

  invoiceCourseObj: any= { }
  invoice(invoiceCourse: any) {
    this.invoiceCourseObj = invoiceCourse
  }
}
