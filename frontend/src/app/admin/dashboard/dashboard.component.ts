import { Component, OnInit } from '@angular/core';
import { AllCourseContent } from 'src/app/models/content';
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

  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.overViewMenus();
    this.chatData();
    this.getContent();
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
      try {
        this.courseCount = res.data.length;
      } catch (error) {}
    });
  }
}
