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
  purchasingCourseDetails: courseDataObj = {
    name: '',
    paymentType: '',
    totalPrice: 0,
    date: '',
  };
  gst: number = 18 / 100;
  constructor(public purchaseService: PurchaseService) { }
  ngOnInit(): void {
    this.purchasingCourseData();
  }
  public purchasingCourseData(): void {
    this.purchasingCourseDetails = this.purchaseService.courseObj;
  }
}
