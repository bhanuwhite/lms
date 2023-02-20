import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit{

  ngOnInit(): void {

   this.getLocalStorageData()
      }

  constructor(private popUp:NgbModal){}

courseDetails:{id:number,category:string,courseTitle:string,courseAuthor:string,rating:number,video:string,price:number}={
  id: 0,
  category: '',
  courseTitle: '',
  courseAuthor:'',
  rating:0,
  video:'',
  price:0

}

  getLocalStorageData(){
    this.courseDetails = JSON.parse(localStorage.getItem('courseDetails') || '{}');

  }

  onClickVideo(popUp:TemplateRef<string>){
    console.log("hello");
    this.popUp.open(popUp)

  }
  onClose(){
    this.popUp.dismissAll();
  }



}
