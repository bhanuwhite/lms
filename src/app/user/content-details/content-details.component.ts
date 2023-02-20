import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from 'primeng/dynamicdialog';
import { VideoPopupComponent } from '../video-popup/video-popup.component';

@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.scss'],
  providers: [DialogService]
})
export class ContentDetailsComponent {
  public displayDialog = false;

  ngOnInit(): void {

    this.getLocalStorageData()
  }

  constructor(public dialogService: DialogService) { }

  courseDetails: { id: number, category: string, courseImage: string, courseTitle: string, courseAuthor: string, rating: number, video: string, price: number } = {
    id: 0,
    category: '',
    courseTitle: '',
    courseAuthor: '',
    rating: 0,
    video: '',
    price: 0,
    courseImage: ''

  }

  getLocalStorageData() {
    this.courseDetails = JSON.parse(localStorage.getItem('courseDetails') || '{}');
    console.log(this.courseDetails);

  }

  onClickVideo(courseDetails: {}) {
    // this.displayDialog = true;
    console.log(courseDetails);
    const ref = this.dialogService.open(VideoPopupComponent, {
      header: 'Course Preview',
      width: '50%',
      data: { name: 'John' },
    });
  }
  onClose() {
    this.displayDialog = false;
  }




}
