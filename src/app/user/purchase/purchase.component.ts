import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { courseDataObj } from 'src/app/interface';
import { MyServiceService } from 'src/app/my-service.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent {
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
  constructor(public router: Router, public myService: MyServiceService) {}

  public receipt(course: courseDataObj): void {
    this.myService.purchasingCourse(course);
    this.router.navigate(['user/receipt']);
  }
  public invoice(course: courseDataObj): void {
    this.myService.invoice(course);
    this.router.navigate(['user/invoice']);
  }
}
