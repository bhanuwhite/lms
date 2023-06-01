import { Component, OnInit, OnDestroy } from '@angular/core';
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

  constructor(private apiservivce: ApiService) {}

  ngOnInit(): void {
    this.getTrackApi();
  }

  public getTrackApi(): void {
      this.TrackRes$ = this.apiservivce.getTrack().subscribe((res) => {
        this.trackResponse = res.data;
        console.log('Track Responce', this.trackResponse);
      });

  }
  public UseridRepeated(index:number):boolean{
    const currentUserId = this.trackResponse[index].attributes.user_id;
    for(let i=0;i<index;i++){
      if(this.trackResponse[i].attributes.user_id === currentUserId){
        return true
      }
    }
    return false;
  }

  ngOnDestroy(): void {
    this.TrackRes$.unsubscribe();
  }
}
