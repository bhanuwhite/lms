import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { courseDataObj } from 'src/app/interface';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss'],
})
export class PurchaseHistoryComponent {
  purchasingCourses: courseDataObj[] = [
    {
      name: 'Angular | Angular is a powerful and popular framework',
      date: '12-2-2022',
      totalPrice: 1000,
      paymentType: 'UPI',
    },
    {
      name: 'Javacript',
      date: '12-2-2021',
      totalPrice: 1100,
      paymentType: 'UPI',
    },
    {
      name: 'React',
      date: '12-2-2023',
      totalPrice: 900,
      paymentType: 'UPI',
    },
  ];
  constructor(public router: Router, public purchaseService: PurchaseService) {}

  public receipt(course: courseDataObj): void {
    this.purchaseService.purchasingCourse(course);
    // this.router.navigate(['user/receipt']);
    this.router.navigate([]).then((res) => {
      window.open('http://localhost:4200/#/user/receipt', '_blank');
    });
  }
  public invoice(course: courseDataObj): void {
    this.purchaseService.invoice(course);
    // this.router.navigate(['user/invoice']);
    this.router.navigate([]).then((res) => {
      window.open('http://localhost:4200/#/user/invoice', '_blank');
    });
  }
}
