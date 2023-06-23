import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AllCourseContentData, ContentResponse } from 'src/app/models/content';
import { UserLibraryGetResponseData } from 'src/app/models/user-library';
import { AboutService } from 'src/app/services/about.service';
import { FormControl, FormGroup } from '@angular/forms';

interface Subjects {
  name: string;
  code: string;
}

@Component({
  selector: 'app-user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.scss'],
})
export class UserContentComponent {
  private contentGetSubscriptions$: Subscription = new Subscription();
  public currentRate: number = 2;
  Spinner: boolean = true;
  public isLoading: boolean = false;
  public coursesList: AllCourseContentData[] = [];
  public courseList2: AllCourseContentData[] = [];
  public items: ContentResponse[] = [];
  public searchWord: string = '';
  public libDataId: number[] = [];
  public showPurchase: boolean = false;
  @ViewChild('desc') desc!: ElementRef;
  userID!: number;
  subscribedCourses!: number;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private messageService: MessageService,
    private aboutService: AboutService
  ) {}

  subjects: Subjects[] = [];

  formGroup!: FormGroup;

  ngOnInit(): void {
    this.getContent();
    this.getLocalData();
    this.gettingUserHasCourse();
    window.scrollTo(0, 0);

    this.subjects = [
      { name: 'All', code: 'all' },
      { name: 'Business development', code: 'BD' },
      { name: 'Database', code: 'DB' },
      { name: 'Information & cyber security', code: 'ICs' },
      { name: 'Software development', code: 'SD' },
      { name: 'Web development', code: 'WD' },
    ];

    this.formGroup = new FormGroup({
      selectedSubject: new FormControl<Subjects | null>(null),
    });
  }
  onSelectSubject(selectedValue: any) {
    this.coursesList = [];

    if (selectedValue.value.selectedSubject.name) {
      console.log(selectedValue.value.selectedSubject.name);

      if (selectedValue.value.selectedSubject.name === 'All') {
        this.coursesList = this.courseList2;
      } else {
        this.courseList2.forEach((course: any) => {
          if (course.attributes.subject.trim() === selectedValue.value.selectedSubject.name.trim()) {
            this.coursesList.push(course);
          }
        });
      }
    }
  }


  public getLocalData(): void {
    const getLocalData = JSON.parse(localStorage.getItem('user')!);
    this.userID = getLocalData.id;
  }
  public gettingUserHasCourse(): void {
    this.apiService.getUserCourse(this.userID).subscribe((res) => {
      this.subscribedCourses = res.length;
      console.log(res);
    });
    this.apiService.getUserCart(this.userID).subscribe((res) => {
      this.aboutService.userCartLength(res.length);
    });
  }

  parsePrice(price: string): number {
    return parseInt(price, 10);
  }

  // Logout
  public onLogout(): void {
    this.router.navigateByUrl('/login');
    localStorage.clear();
    location.reload();
  }

  // Get Content
  public getContent(): void {
    this.apiService.getContent().subscribe((res) => {
      console.log(res);

      try {
        this.Spinner = false;
        this.coursesList = res.data;
        this.courseList2 = res.data;
        this.items = res.data;
        this.isLoading = true;
      } catch (error) {
        console.log(error);
      }
    });
  }

  public searchFunction() {
    if (this.searchWord) {
      this.coursesList = this.courseList2.filter(
        (course: any) =>
          course.attributes.name
            .toLowerCase()
            .includes(this.searchWord.toLowerCase()) ||
          course.attributes.price
            .toLowerCase()
            .includes(this.searchWord.toLowerCase()) ||
          course.attributes.level
            .toLowerCase()
            .includes(this.searchWord.toLowerCase())
      );
    } else {
      this.coursesList = this.courseList2;
    }
  }

  ngOnDestroy(): void {
    this.contentGetSubscriptions$.unsubscribe();
  }
}
