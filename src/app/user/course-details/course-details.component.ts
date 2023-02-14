import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  course_Details:any={}
  jsonCourse_Details:any={}
  ngOnInit(): void {
    this.jsonCourse_Details=localStorage.getItem('courseDetails')
    this.course_Details=JSON.parse(this.jsonCourse_Details)
    console.log(this.course_Details);

  }

}
