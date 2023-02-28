import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{
  courseDetails!: { price: number };
  discount!: number;
  total!: number;
  cities: { name: string; code: string; }[];
  selectedCity1!: {};

  ngOnInit(): void {
    this.getLocalStorageData();

  }

  constructor() {

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }
  getLocalStorageData() {
    this.courseDetails = JSON.parse(localStorage.getItem('courseDetails') || '{}');
    console.log(this.courseDetails);
    this.discount = (this.courseDetails.price * 20) / 100;
    this.total = this.courseDetails.price - this.discount
  }

}
