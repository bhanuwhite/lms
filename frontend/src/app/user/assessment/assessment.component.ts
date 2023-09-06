import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { AboutService } from 'src/app/services/about.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss'],
})
export class AssessmentComponent implements OnInit {
  public allCourses: string[] = [];
  public searchQuery: string = '';
  public items: string[] = [];
  userID!: number;
  public Spinner: boolean = true;

  constructor(
    private apiService: ApiService,
    private route: Router,
    private aboutService: AboutService
  ) {}

  targetTime!: Date;
  countdown!: string;
  private timerSubscription: Subscription = new Subscription();
  ngOnInit(): void {
    this.targetTime = new Date();
    // this.targetTime.setDate(this.targetTime.getDate() + 14);
    const currentTime = new Date();
    this.targetTime = new Date(currentTime.getTime() + 5 * 60 * 1000);
    this.timerSubscription = interval(1000).subscribe(() => {
      this.updateCountdown();
    });

    this.getAllQuizDetails();
    this.getAllCourseDetais();
    this.getLocalStoredData();
    this.getCartCourse();
  }
  public getLocalStoredData() {
    const localStoredData = JSON.parse(localStorage.getItem('user')!);
    this.userID = localStoredData.id;
  }

  public getCartCourse(): void {
    this.apiService.getUserCart(this.userID).subscribe((res) => {
      this.aboutService.userCartLength(res.length);
    });
  }

  public uniqueTech: string[] = [];
  filteredTech: string[] = [];
  public getAllCourseDetais() {
    this.apiService.getContent().subscribe((res) => {
      res.data.forEach((item) => {
        this.allCourses.push(item.attributes?.technologies);
        this.allCourses.forEach((item) => {
          const values = Object.values(item);
          values.forEach((obj) => {
            if (!this.uniqueTech.includes(obj)) {
              this.uniqueTech.push(obj);
            }
          });
        });
      });
      this.Spinner = false;
    });
  }

  courseTech: string[] = [];
  public getAllQuizDetails() {
    this.apiService.getQuiz().subscribe((res) => {
      this.courseTech = res.data.map(
        (resObj: any) => resObj.attributes.course_name
      );
    });
    setTimeout(() => {
      this.courseTech = Array.from(new Set(this.courseTech));
      this.filteredTech = this.courseTech;
    }, 1000);
  }

  public openQuiz(course: string) {
    this.route.navigate(['/assessment/', course]);
    localStorage.setItem('CourseName', course);
  }

  public onSearchDetails(): void {
    const searchInputLowercase = this.searchQuery.toLowerCase();
    this.filteredTech = this.courseTech.filter((tech) =>
      tech.toLowerCase().includes(searchInputLowercase)
    );
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
  // updateCountdown(): void {
  //   const currentTime = new Date();
  //   const timeDifference = this.targetTime.getTime() - currentTime.getTime();

  //   if (timeDifference <= 0) {
  //     this.countdown = 'Product is now available!';
  //   } else {
  //     const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  //     const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //     const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  //     const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  //     this.countdown = `${days}d ${hours}hr ${minutes}m ${seconds}s`;
  //   }
  // }

  updateCountdown(): void {
    const currentTime = new Date();
    const timeDifference = this.targetTime.getTime() - currentTime.getTime();

    if (timeDifference <= 0) {
      this.countdown = 'Product is now available!';
    } else {
      const minutes = Math.floor(timeDifference / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      this.countdown = `${minutes}m ${seconds}s`;
    }
  }
}
