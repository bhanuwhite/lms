import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProgressDetails } from 'src/app/models/track';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environment/environment';
environment;
@Component({
  selector: 'app-track-details',
  templateUrl: './track-details.component.html',
  styleUrls: ['./track-details.component.scss'],
})
export class TrackDetailsComponent implements OnInit {
  public userTrackId!: number;
  public TrackUserData: {} = {};
  public imgUrl = environment.apiUrl;
  public UserTracking: UserProgressDetails[] = [];
  private UserTeck: string[] = [];
  private userTeckProgress: number[] = [];
  public courseLength!: number;
  constructor(
    private apiService: ApiService,
    private activeParam: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getActiveParams();
    this.getTrackId().then(() => {
      this.getChart();
    });
  }

  public getActiveParams(): void {
    this.activeParam.params.subscribe((res) => {
      this.userTrackId = res['id'];
    });
  }

  public async getTrackId(): Promise<void> {
    try {
      const res = await this.apiService
        .getSingleUserProgress(this.userTrackId)
        .toPromise();
      this.UserTracking = res;
      this.UserTracking = this.UserTracking.filter((resObj) => {
        return resObj.course_ids.length != 0;
      });
      this.courseLength = this.UserTracking.length;
      this.UserTeck = this.UserTracking.map((res) => {
        return res.course_ids[0]?.technologies['1'];
      });
      this.userTeckProgress = this.UserTracking.map((res) => {
        return Number(res.progress_percentage);
      });
    } catch (err) {
      console.error(err);
    }
  }

  public getChart(): void {
    if (!this.UserTeck || !this.userTeckProgress) {
      return;
    }
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const barColors = [
      documentStyle.getPropertyValue('--red-500'),
      documentStyle.getPropertyValue('--blue-500'),
      documentStyle.getPropertyValue('--green-500'),
      documentStyle.getPropertyValue('--yellow-500'),
      documentStyle.getPropertyValue('--navy-500'),
      documentStyle.getPropertyValue('--pink-500'),
    ];
    this.TrackUserData = {
      labels: this.UserTeck,
      datasets: [
        {
          label: 'User Courses Track',
          backgroundColor: barColors.slice(0, this.UserTeck.length),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: this.userTeckProgress,
          barPercentage: 0.4,
        },
      ],
    };
  }

  public courseDetails(id: number) {
    this.router.navigate([`admin/content/${id}`]);
  }
}
