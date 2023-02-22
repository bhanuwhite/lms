import { Injectable } from '@angular/core';
import { courseDataObj } from './interface';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor() { }
  courseObj={}
  purchasingCourse(purchaseCourse:courseDataObj){
    this.courseObj=purchaseCourse
  }
}
