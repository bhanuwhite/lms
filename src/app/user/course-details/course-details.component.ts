import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { VideoPopUpComponent } from '../video-pop-up/video-pop-up.component';


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
  providers: [DialogService]
})
export class CourseDetailsComponent implements OnInit{
 public displayDialog = false;

  ngOnInit(): void {

   this.getLocalStorageData()
      }

  constructor(public dialogService: DialogService){}

courseDetails:{id:number,category:string,courseImage:string,courseTitle:string,courseAuthor:string,rating:number,video:string,price:number}={
  id: 0,
  category: '',
  courseTitle: '',
  courseAuthor:'',
  rating:0,
  video:'',
  price:0,
  courseImage:''

}

  getLocalStorageData(){
    this.courseDetails = JSON.parse(localStorage.getItem('courseDetails') || '{}');

  }

  onClickVideo(courseDetails:{}){

    const ref = this.dialogService.open(VideoPopUpComponent, {
      header: 'Course Preview',
      width: '50%',
      data: { name: 'John' },
  });
  }
  onClose(){
    this.displayDialog = false;
  }




}
