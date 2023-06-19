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

  constructor(private apiservivce: ApiService, public router:Router) {}

  ngOnInit(): void {
    this.getTrackApi();
  }

  public getTrackApi():Promise<void> {
    return new Promise((resolve,reject)=>{
      this.TrackRes$ = this.apiservivce.getTrack().subscribe((res) => {
        this.trackResponse = res.data;
      });
      resolve();
      (err:any)=>{
        reject(err)
      }
    })
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

  public showTrackDetails(id:number): void{
    console.log(id);

    this.router.navigate(['trackuser/',id])
  }

  ngOnDestroy(): void {
    this.TrackRes$.unsubscribe();
  }
}
