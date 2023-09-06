import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { courseDataObj } from 'src/app/interface';
import { CourseData } from 'src/app/models/library';
import { ApiService } from 'src/app/services/api.service';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss'],
})
export class PurchaseHistoryComponent implements OnInit {
  purchasingCourses: any[] = [];
  userID!: number;

  constructor(
    public router: Router,
    private apiservice: ApiService,
    private purchaseService: PurchaseService
  ) {}

  ngOnInit(): void {
    this.getLocalStoredData();
    this.getPaidCourses();
  }

  public getLocalStoredData() {
    const localStoredData = JSON.parse(localStorage.getItem('user')!);
    this.userID = localStoredData.id;
  }

  getPaidCourses() {
    this.apiservice.getUserCourse(this.userID).subscribe((res: CourseData[]) => {
      res.map((course: CourseData) => {
        if (course.course_ids.length != 0 && course.course_ids[0].price != 0) {
          this.purchasingCourses.push(course);
        }
      });
    });
  }

  public receipt(course: courseDataObj): void {
    this.purchaseService.purchasingCourse(course);
    this.router.navigate(['user/receipt']);
  }
  public invoice(course: courseDataObj): void {
    this.purchaseService.invoice(course);
    this.router.navigate(['user/invoice']);
  }
}
