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
  purchasingCourses = [
    {
      name: 'Angular | Angular is a powerful and popular framework',
      date: new Date(),
      totalPrice: 1000,
      paymentType: 'UPI',
    },
    {
      name: 'Javacript',
      date: new Date(),
      totalPrice: 1100,
      paymentType: 'UPI',
    },
    {
      name: 'React',
      date: new Date(),
      totalPrice: 900,
      paymentType: 'UPI',
    }
  ];
  constructor(public router:Router,public myService:MyServiceService){ }

  receipt(course:any){
    this.myService.purchasingCourse(course)
    localStorage.setItem("purchasingCourse", JSON.stringify(course))
    this.router.navigate(['user/receipt'])
  }
}
