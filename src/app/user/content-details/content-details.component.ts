import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.scss']
})
export class ContentDetailsComponent {
  ngOnInit(): void {

    this.getLocalStorageData()
  }

  constructor(private popUp: NgbModal) { }

  courseDetails: { id: number, category: string, courseTitle: string, courseAuthor: string, rating: number, video: string, price: number } = {
    id: 0,
    category: '',
    courseTitle: '',
    courseAuthor: '',
    rating: 0,
    video: '',
    price: 0

  }

  getLocalStorageData() {
    this.courseDetails = JSON.parse(localStorage.getItem('contentDetails') || '{}');

  }

  onClickVideo(popUp: TemplateRef<string>) {
    console.log("hello");
    this.popUp.open(popUp)

  }
  onClose() {
    this.popUp.dismissAll();
  }


}
