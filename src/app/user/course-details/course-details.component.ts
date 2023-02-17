import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit{

courseDetails:{id:number,category:string,courseTitle:string,courseAuthor:string,rating:number}={
  id: 0,
  category: '',
  courseTitle: '',
  courseAuthor:'',
  rating:0

}

  ngOnInit(): void {

    this.courseDetails = JSON.parse(localStorage.getItem('courseDetails') || '{}');
    console.log(this.courseDetails.courseAuthor);

  }



}
