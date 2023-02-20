import { Component, OnInit } from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';


@Component({
  selector: 'app-video-pop-up',
 templateUrl:'video-pop-up.component.html',
  styleUrls: ['./video-pop-up.component.scss']
})
export class VideoPopUpComponent implements OnInit{

  public courseDetails!: { courseTitle: string; video: string; };


  constructor(public dialogService: DialogService,public ref: DynamicDialogRef, public config: DynamicDialogConfig) {}

  ngOnInit(): void {
  this.getLocalStorageData();
  }

  getLocalStorageData(){
    this.courseDetails = JSON.parse(localStorage.getItem('courseDetails') || '{}');

  }




}
