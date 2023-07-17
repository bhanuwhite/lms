import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { UserDetails } from 'src/app/models/track';

@Component({
  selector: 'app-trackuser',
  templateUrl: './trackuser.component.html',
  styleUrls: ['./trackuser.component.scss'],
})
export class TrackuserComponent implements OnInit, OnDestroy {
  public allUsersData: UserDetails[] = [];
  private TrackRes$: Subscription = new Subscription();

  constructor(private apiservivce: ApiService, public router: Router) {}

  ngOnInit(): void {
    this.getTrackApi();
  }

  public getTrackApi(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiservivce.getAllUers().subscribe((res) => {
        this.allUsersData = res.filter((resObj: UserDetails) => {
          return resObj.role_id == 3;
        });
      });
      resolve();
      (err: any) => {
        reject(err);
      };
    });
  }

  public showTrackDetails(id: number): void {
    this.router.navigate(['trackuser/', id]);
  }

  ngOnDestroy(): void {
    this.TrackRes$.unsubscribe();
  }
}
