import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrackResponseData } from 'src/app/models/track';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-trackuser',
  templateUrl: './trackuser.component.html',
  styleUrls: ['./trackuser.component.scss'],
})
export class TrackuserComponent implements OnInit,OnDestroy {
  public trackResponse: TrackResponseData[] = [];
  private TrackRes$: Subscription = new Subscription();

  constructor(private apiservivce: ApiService) {}

  ngOnInit(): void {
    this.getTrackApi()
  }
  public getTrackApi(): void {
    this.TrackRes$ = this.apiservivce.getTrack().subscribe((res) => {
      try {
        this.trackResponse = res.data;
        console.log('Track Responce', this.trackResponse);
      } catch (error) {
        console.log(error);
      }
    });
  }




  ngOnDestroy(): void {
    this.TrackRes$.unsubscribe()
  }

}
