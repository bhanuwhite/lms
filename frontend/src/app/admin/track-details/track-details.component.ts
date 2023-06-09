import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-track-details',
  templateUrl: './track-details.component.html',
  styleUrls: ['./track-details.component.scss'],
})
export class TrackDetailsComponent implements OnInit {

  public userTrackId!: number;
  public TrackUserData: any
  options:any
  constructor(
    private apiService: ApiService,
    private activeParam: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getActiveParams();
    this.getTrackId();
    this.getChart();
  }

  public getActiveParams(): void {
    this.activeParam.params.subscribe((res) => {
      this.userTrackId = res['id'];
    });
  }

  userCourses: any;
  public getTrackId(): void {
    // this.apiService.getTrackbyId(this.trackId).subscribe((res)=>{
    //   console.log("track by Id", res);
    // })

    this.apiService.getTrack().subscribe((res) => {
      console.log('Track res', res);

      this.userCourses = res.data.filter((res:any)=>
        this.userTrackId === res.attributes.user_id
      );
      console.log("User subscribed Courses", this.userCourses);

    });
  }

  public getChart():void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.TrackUserData = {
      labels: ["Angular", "React", "NodeJS","MongoDB"],
      datasets: [
          {
              label: 'User Courses Track',
              backgroundColor: documentStyle.getPropertyValue('--red-500'),
              borderColor: documentStyle.getPropertyValue('--blue-500'),
              data: [65, 59, 41,23]
          }
      ]
  };

  this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.5,
      plugins: {
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: textColorSecondary,
                  font: {
                      weight: 500
                  }
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          },
          y: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          }

      }
  };
}



  // below is the end.
}
