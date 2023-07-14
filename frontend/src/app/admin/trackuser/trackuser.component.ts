import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { resolve } from 'chart.js/dist/helpers/helpers.options';
import { Subscription } from 'rxjs';
import { TrackResponseData } from 'src/app/models/track';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-trackuser',
  templateUrl: './trackuser.component.html',
  styleUrls: ['./trackuser.component.scss'],
})
export class TrackuserComponent implements OnInit, OnDestroy {
  public trackResponse: TrackResponseData[] = [];
  private TrackRes$: Subscription = new Subscription();

  constructor(private apiservivce: ApiService, public router: Router) {}

  ngOnInit(): void {
    this.getTrackApi();
  }

  myUsers: any[] = [];

  public getTrackApi(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.TrackRes$ = this.apiservivce.getTrack().subscribe((res) => {
        this.trackResponse = res.data;
      });

      this.apiservivce.getAllUsers().subscribe((AllUsers) => {
        AllUsers.map((resObj: any) => {
          if (resObj.course_ids.length != 0 && resObj.user_id) {
            if (this.myUsers.length === 0) {
              this.myUsers.push(resObj);
            } else {
              this.myUsers.map((myUserRes: any) => {
                if (myUserRes.user_id.id === resObj.user_id.id) {
                  myUserRes.course_ids.push(resObj.course_ids[0]);
                } else {
                  this.myUsers.push(resObj);
                }
              });
            }
          }
        });
      });

      resolve();
      (err: any) => {
        reject(err);
      };
    });
  }

  public UseridRepeated(index: number): boolean {
    const currentUserId = this.trackResponse[index].attributes.user_id;
    for (let i = 0; i < index; i++) {
      if (this.trackResponse[i].attributes.user_id === currentUserId) {
        return true;
      }
    }
    return false;
  }

  public showTrackDetails(id: number): void {
    this.router.navigate(['trackuser/', id]);
  }

  ngOnDestroy(): void {
    this.TrackRes$.unsubscribe();
  }
}
