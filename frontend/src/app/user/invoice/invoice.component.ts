import { Component, OnInit } from '@angular/core';
import { courseDataObj } from 'src/app/interface';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit{

  currentDate = new Date();
  invoiceCourseDetails: any;
userDetails!:any;
  gst: number = 18 / 100;
  constructor(public purchaseService: PurchaseService) { }

  ngOnInit(): void {

    this.invoiceData();
    this.userLocalStorage();
  }


  userLocalStorage(){

    this.userDetails  = JSON.parse(localStorage.getItem('user')!);
    // console.log(this.userDetails);
  }
  public invoiceData(): void {
    this.invoiceCourseDetails = this.purchaseService.invoiceCourseObj;
    // console.log(this.invoiceCourseDetails);
  }
}
