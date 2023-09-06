import { Component, OnInit } from '@angular/core';
import { AllCourseContent, AllCourseContentData } from 'src/app/models/content';
import { userProfile } from 'src/app/models/profile';
import { UserDetails } from 'src/app/models/track';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public schedule = ['Weekly', 'Monthly', 'Quarterly'];
  visibleSidebar1: boolean = true;
  courseCount!: number;
  public allUsersData: UserDetails[] = [];
  public totalUser!: number;
  public freeCourseCount: number = 0;
  public paidCourseCount: number = 0;
  public assessmentCount: number = 0;
  public purchaseCount: number = 0;
  public allCourses: string[] = [];
  public uniqueTech: string[] = [];
  public img_url = environment.apiUrl;
  public top5Courses: AllCourseContentData[] = [];
  public top3ViewedCourses: AllCourseContentData[] = [];
  private topViewedCourses: string[] = [];
  private topViewedCount: string[] = [];
  public topViewedCourseData: {} = {};
  public usersData: userProfile[] = [];
  public usersData2: userProfile[] = [];

  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.getTrackApi();
    this.getContent();
    setTimeout(() => {
      this.getViewedChart();
    }, 1000);
    this.getUsers();
  }

  private getUsers(): void {
    this.apiService.getProfileDetails().subscribe((res) => {
      this.usersData = [...res];
      this.usersData.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      this.usersData = this.usersData.filter((res: userProfile) => {
        return res.role_id == 3;
      });
      this.usersData2 = this.usersData.slice(0, 5);
      return 2;
    });
  }

  private getViewedChart(): Promise<void> {
    return new Promise((resolve, reject) => {
      (this.topViewedCourseData = {
        labels: this.topViewedCourses,
        datasets: [
          {
            label: 'Top 3 viewed courses',
            data: this.topViewedCount,
            backgroundColor: [
              'rgba(255, 159, 64, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgb(255, 159, 64)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
            ],
            borderWidth: 1,
          },
        ],
      }),
        resolve(),
        reject((err: any) => {
          console.log(err);
        });
    });
  }

  public getTrackApi(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiService.getAllUers().subscribe((res) => {
        this.allUsersData = res.filter((resObj: UserDetails) => {
          return resObj.role_id == 3;
        });
        this.totalUser = this.allUsersData.length;
      });
      resolve();
      (err: any) => {
        reject(err);
      };
    });
  }

  public close(): void {
    this.visibleSidebar1 = false;
  }

  public getContent(): Promise<void> {
    return new Promise((resolve, reject) => [
      this.apiService.getContent().subscribe((res: AllCourseContent) => {
        try {
          this.courseCount = res.data.length;
          res.data.map((resObj: AllCourseContentData) => {
            if (Number(resObj.attributes.price) == 0) {
              this.freeCourseCount += 1;
            } else {
              this.paidCourseCount += 1;
            }
            if (resObj.attributes.no_of_purchases != 0) {
              this.purchaseCount += 1;
            }
          });
          res.data.sort(
            (a: any, b: any) =>
              b.attributes.no_of_purchases - a.attributes.no_of_purchases
          );
          this.top5Courses = res.data.slice(0, 5);
          res.data.sort(
            (a: any, b: any) =>
              b.attributes.video_name - a.attributes.video_name
          );
          this.top3ViewedCourses = res.data.slice(0, 3);
          this.top3ViewedCourses.map((resObj: AllCourseContentData) => {
            this.topViewedCourses.push(resObj.attributes.technologies['1']);
          });
          this.top3ViewedCourses.map((resObj: AllCourseContentData) => {
            if (resObj.attributes.video_name) {
              this.topViewedCount.push(resObj.attributes.video_name);
            }
          });
          res.data.forEach((item) => {
            this.allCourses.push(item.attributes?.technologies);
            this.allCourses.forEach((obj) => {
              const values = Object.values(obj);
              values.forEach((value) => {
                if (!this.uniqueTech.includes(value)) {
                  this.uniqueTech.push(value);
                }
              });
            });
          });
          this.assessmentCount = this.uniqueTech.length;
        } catch (error) {
          console.log(error);
        }
      }),
      resolve(),
      reject((err: any) => {
        console.log(err);
      }),
    ]);
  }
}
