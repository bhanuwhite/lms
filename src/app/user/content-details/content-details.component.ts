import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.scss']
})
export class ContentDetailsComponent implements OnInit {
  contentDetails: { id: number, category: string, courseTitle: string, courseAuthor: string, rating: number } = {
    id: 0,
    category: '',
    courseTitle: '',
    courseAuthor: '',
    rating: 0

  }


  ngOnInit(): void {
    this.getCotentDetails();

  }

  public getCotentDetails(): void {
    const data: any = localStorage.getItem('courseDetails') || {};
    this.contentDetails = JSON.parse(data);
    console.log(this.contentDetails);
  }

}
