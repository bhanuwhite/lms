import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AllCourseContentData, ContentResponse } from 'src/app/models/content';
import { UserLibraryGetResponseData } from 'src/app/models/user-library';
import { AboutService } from 'src/app/services/about.service';
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
    private aboutService:AboutService
  ) {}

  ngOnInit(): void {
    this.getContent();
    this.getLocalData();
    this.gettingUserHasCourse();
    window.scrollTo(0, 0);
  }

  public getLocalData(): void {
    const getLocalData = JSON.parse(localStorage.getItem('user')!);
    this.userID = getLocalData.id;
  }
  public gettingUserHasCourse(): void {
    this.apiService.getUserCourse(this.userID).subscribe((res) => {
      console.log('User Lib Data ', res);
      this.subscribedCourses = res.length;
    });
    this.apiService.getUserCart(this.userID).subscribe((res)=>{
      this.aboutService.userCartLength(res.length)
    })
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
