import { Component } from '@angular/core';
import { MyServiceService } from 'src/app/my-service.service';
import { courseDataObj } from 'src/app/interface';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent {
  currentDate = new Date();
  invoiceCourseDetails: courseDataObj = {
    name: '',
    paymentType: '',
    totalPrice: 0,
    date: '',
  };
  gst: number = 18 / 100;
  constructor(public myService: MyServiceService) {}
  ngOnInit(): void {
    this.invoiceData();
  }
  public invoiceData(): void {
    this.invoiceCourseDetails = this.myService.invoiceCourseObj;
  }
}
