import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.scss'],
})
export class MyLibraryComponent implements OnInit {
  items!: MenuItem[];
  constructor(private httpClient: HttpClient) {}
  public course_Details: any = [];
  public course_Details2: any = [];
  public value: number = 10;
  public progressValue: number = 25;
  courseDetailsJSON = '../../assets/course_details/courseDetails.json';
  ngOnInit(): void {
    this.readingJSON();
  }

  public readingJSON():void {
    this.httpClient.get(this.courseDetailsJSON).subscribe((data) => {
      try {
        this.course_Details = data;
        this.course_Details2 = this.course_Details;
        this.items = [
          { label: 'All Courses' },
          { label: 'My List' },
          { label: 'Wish List' },
          { label: 'Archives' },
          { label: 'My Tools' },
        ];
      } catch (error) {
        console.log(error);
      }
    });
  }

  public myCourseDetails(courseDetails: object): void {
    localStorage.setItem('courseDetails', JSON.stringify(courseDetails));
  }
}
