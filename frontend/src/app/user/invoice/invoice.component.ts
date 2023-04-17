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
  invoiceCourseDetails: courseDataObj = {
    name: '',
    paymentType: '',
    totalPrice: 0,
    date: '',
  };
  gst: number = 18 / 100;
  constructor(public purchaseService: PurchaseService) { }
  ngOnInit(): void {
    this.invoiceData();
  }
  public invoiceData(): void {
    this.invoiceCourseDetails = this.purchaseService.invoiceCourseObj;
    console.log(this.invoiceCourseDetails);
  }
}
