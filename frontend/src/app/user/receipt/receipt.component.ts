import { Component, OnInit } from '@angular/core';
import { courseDataObj } from 'src/app/interface';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit{


  currentDate = new Date();
  purchasingCourseDetails: any;
userName!:any;
  gst: number = 18 / 100;
  constructor(public purchaseService: PurchaseService) { }
  ngOnInit(): void {
    this.purchasingCourseData();
    this.userLocalStorage();
  }


  public purchasingCourseData(): void {
    this.purchasingCourseDetails = this.purchaseService.courseObj;
    console.log(this.purchasingCourseDetails);

  }

  userLocalStorage(){

    const localStoredData = JSON.parse(localStorage.getItem('user')!);
    this.userName = localStoredData.username;
    console.log(this.userName);
  }
}
