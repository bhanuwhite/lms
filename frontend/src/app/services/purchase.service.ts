import { Injectable } from '@angular/core';
import { courseDataObj } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor() { }

  courseObj: courseDataObj = {
    name: "",
    paymentType: '',
    totalPrice: 0,
    date: ''
  }
  purchasingCourse(purchaseCourse: courseDataObj) {
    this.courseObj = purchaseCourse;
  }
  invoiceCourseObj: courseDataObj = {
    name: "",
    paymentType: '',
    totalPrice: 0,
    date: ''
  }
  invoice(invoiceCourse: courseDataObj) {
    this.invoiceCourseObj = invoiceCourse
  }
}
