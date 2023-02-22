import { Component, OnInit } from '@angular/core';
import { MyServiceService } from 'src/app/my-service.service';
import { courseDataObj } from 'src/app/interface';


@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {
  currentDate=new Date()
  purchasingCourseDetails:any={}
  gst:number=(18)/100
  constructor( public myService:MyServiceService){ }
  ngOnInit(): void {
    this.purchasingCourseData()
  }
  public purchasingCourseData():void{
  this.purchasingCourseDetails=  this.myService.courseObj

  }

}
