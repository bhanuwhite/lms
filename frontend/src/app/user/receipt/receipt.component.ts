import { Component, OnInit } from '@angular/core';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss'],
})
export class ReceiptComponent implements OnInit {
  currentDate = new Date();
  purchasingCourseDetails: any;
  userName!: string;
  gst: number = 18 / 100;
  constructor(public purchaseService: PurchaseService) {}
  ngOnInit(): void {
    this.purchasingCourseData();
    this.userLocalStorage();
  }

  public purchasingCourseData(): void {
    this.purchasingCourseDetails = this.purchaseService.courseObj;
  }

  userLocalStorage() {
    const localStoredData = JSON.parse(localStorage.getItem('user')!);
    this.userName = localStoredData.username;
  }
}
