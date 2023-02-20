import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-video-popup',
  templateUrl: './video-popup.component.html',
  styleUrls: ['./video-popup.component.scss'],
  providers: [DialogService]
})
export class VideoPopupComponent implements OnInit {
  public courseDetails!: { courseTitle: string; video: string; };


  constructor(public dialogService: DialogService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.getLocalStorageData();
  }

  getLocalStorageData() {
    this.courseDetails = JSON.parse(localStorage.getItem('courseDetails') || '{}');
  }
}
