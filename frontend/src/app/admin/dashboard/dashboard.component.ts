import { Component, OnInit } from '@angular/core';
import { AllCourseContent } from 'src/app/models/content';
import { UserDetails } from 'src/app/models/track';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  basicData: any;
  overViewMenu: any;

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
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.overViewMenus();
    this.chatData();
    this.getContent();
    this.getTrackApi();
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

  chat: number[] = [65, 59, 80, 81, 56, 80, 80];
  /**
   * chatData
   */
  public chatData(): void {
    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: this.chat,
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.4,
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#FFA726',
          tension: 0.4,
        },
      ],
    };
  }

  public overViewMenus(): void {
    this.overViewMenu = [
      {
        items: [
          {
            label: 'Monthly',
          },
          {
            label: 'Weekly',
          },
        ],
      },
    ];
  }

  public close(): void {
    this.visibleSidebar1 = false;
  }

  public getContent(): void {
    this.apiService.getContent().subscribe((res: AllCourseContent) => {
      console.log(res.data);
      try {
        this.courseCount = res.data.length;
        res.data.map((resObj: any) => {
          if (resObj.attributes.price == 0) {
            this.freeCourseCount += 1;
          } else {
            this.paidCourseCount += 1;
          }
          if (resObj.attributes.no_of_purchases != 0) {
            this.purchaseCount += 1;
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
      } catch (error) {}
    });
  }
}
