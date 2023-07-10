import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { courseDataObj } from 'src/app/interface';
import { ApiService } from 'src/app/services/api.service';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss'],
})
export class PurchaseHistoryComponent implements OnInit{

  purchasingCourses: any[] = [];
  userID!:number;

  constructor(public router: Router, private apiservice:ApiService ,private purchaseService : PurchaseService) {}

  ngOnInit(): void {
     this.getLocalStoredData();
     this.getPaidCourses();
     console.log("hello");

  }

  public getLocalStoredData() {
    const localStoredData = JSON.parse(localStorage.getItem('user')!);
    this.userID = localStoredData.id;
    console.log(this.userID);

  }


 getPaidCourses(){


  this.apiservice.getUserCourse(this.userID).subscribe((res: any) => {

  console.log(this.userID);

    res.map((course: any) => {
      if (course.course_ids.length != 0 && course.course_ids[0].price != 0) {
        this.purchasingCourses.push(course);
        console.log(this.purchasingCourses);

      }
    });
  });
 }












  public receipt(course: courseDataObj): void {
    this.purchaseService.purchasingCourse(course);
    this.router.navigate(['user/receipt']);


    // this.router.navigate([]).then((res) => {
    //   window.open('http://localhost:4200/#/user/receipt', '_blank');
    // });
  }
  public invoice(course: courseDataObj): void {
    this.purchaseService.invoice(course);
    this.router.navigate(['user/invoice']);
    // this.router.navigate([]).then((res) => {
    //   window.open('http://localhost:4200/#/user/invoice', '_blank');
    // });
  }
}

