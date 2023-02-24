import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from 'primeng/api';
import { dropDown } from 'src/app/interface';

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.scss'],
})
export class MyLibraryComponent implements OnInit {
  items!: MenuItem[];
  searchWord: string = '';
  public course_Details: any = [];
  public course_Details2: any = [];
  public value: number = 10;
  public progressValue: number = 25;
  // faSearch = faSearch;
  courseDetailsJSON = '../../assets/course_details/courseDetails.json';
  public recentlyAccessDropdown: dropDown[] = [];
  public selectedRecentlyAccess: string = '';
  public categoryDropdown: dropDown[] = [];
  public selectedCategory: string = '';
  public progressDropdown: dropDown[] = [];
  public selectedProgress: string = '';
  public instructorDropdown: dropDown[] = [];
  public selectedInstructor: string = '';
  constructor(private httpClient: HttpClient) {
    this.recentlyAccessDropdown = [
      { name: 'Recently Accessed' },
      { name: 'Recently Enrolled' },
      { name: 'Title: A-to-Z' },
      { name: 'Title: Z-to-A' },
    ];
    this.categoryDropdown = [
      { name: 'Favorites' },
      { name: 'All categories' },
      { name: 'Design' },
      { name: 'Development' },
      { name: 'IT & Software' },
      { name: 'Archived' },
    ];
    this.progressDropdown = [{ name: 'Not Started' }, { name: 'In Progress' }];
    this.instructorDropdown = [
      { name: 'Mahesh' },
      { name: ' Ravi' },
      { name: 'Sreeja' },
      { name: 'Navya' },
    ];
  }

  ngOnInit(): void {
    this.readingJSON();
  }
  public searchData: any = [];
  public searchFun() {
    this.searchData = this.course_Details.filter((each: any) =>
      each.title.toLowerCase().includes(this.searchWord.toLowerCase())
    );
  }
  public readingJSON(): void {
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
