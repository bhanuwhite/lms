import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from 'primeng/api';
import { dropDown } from 'src/app/interface';
import { ApiService } from 'src/app/services/api.service';
import { each } from 'chart.js/dist/helpers/helpers.core';
import { getContentLibrary, userLibrary } from 'src/app/models/content';

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.scss'],
})
export class MyLibraryComponent implements OnInit {
  items!: MenuItem[];
  searchWord: string = '';
  // public course_Details: any = [];
  // public course_Details2: any = [];
  public value: number = 10;
  public progressValue: number = 25;

  courseDetailsJSON = '../../assets/course_details/courseDetails.json';
  public recentlyAccessDropdown: dropDown[] = [];
  public selectedRecentlyAccess: string = '';
  public categoryDropdown: dropDown[] = [];
  public selectedCategory: string = '';
  public progressDropdown: dropDown[] = [];
  public selectedProgress: string = '';
  public instructorDropdown: dropDown[] = [];
  public selectedInstructor: string = '';
  loadingSpinner: boolean = false;

  constructor(private httpClient: HttpClient, private apiService: ApiService) {}

  ngOnInit(): void {
    this.getContentLibrary();
  }

  public courseData: any = [];

 public courseDetails:userLibrary[]=[]
  // public readingJSON(): void {
  //   this.httpClient.get(this.courseDetailsJSON).subscribe((data) => {
  //     try {
  //       this.course_Details = data;
  //        this.courseDetails = data;
  //       this.course_Details2 = this.course_Details;
  //       this.items = [
  //         { label: 'All Courses' },
  //         { label: 'My List' },
  //         { label: 'Wish List' },
  //         { label: 'Archives' },
  //         { label: 'My Tools' },
  //       ];
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
  // }

  public getContentLibrary() {

    this.loadingSpinner = true;
    this.apiService.getContentLibrary().subscribe((res) => {
      console.log(res);

      try {
        console.log(res.data[0].attributes);
        this.courseData = res.data;
        console.log(this.courseDetails);
    this.loadingSpinner = true;

      } catch (error) {
        console.log(error);
      }
    });

  }
  public searchData !:any;

  public searchFun() {
    this.searchData = this.courseData.filter((each: any) =>
      each.title.toLowerCase().includes(this.searchWord.toLowerCase())
    );
    console.log(this.searchWord);

  }

  public myCourseDetails(courseDetails: object): void {
console.log(courseDetails);

  }
}
