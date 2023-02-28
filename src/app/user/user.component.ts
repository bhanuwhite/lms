import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from '../services/api.service';
import courseList from '../../assets/data/courseDetails.json';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [MessageService]
})
export class UserComponent implements OnInit, OnDestroy {

  private contentGetSubscriptions$: Subscription = new Subscription();
  public contentData!: any;
  public currentRate: number = 2;

  public isLoading: boolean = false;
  public items: any;
  public courseList: {
    id: number;
    courseImage: string;
    courseTitle: string;
    author: string;
    rating: number;
    price: number;
  }[] = courseList;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private messageService: MessageService
  ) { }


  ngOnInit(): void {
    this.getContent();
  }

  // Logout 
  public onLogout(): void {
    this.router.navigateByUrl('/login');
    localStorage.clear();
    location.reload();
  }

  // Get Content 
  public getContent(): void {
    this.isLoading = true;
    this.contentGetSubscriptions$ = this.apiService.getContent().subscribe((res) => {
      try {
        this.contentData = res.data;
        console.log(this.contentData);
        this.isLoading = false;
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Somethinng went to wrong !!',
        });
      }

    });
  }
  public courseDetails!: string
  public openCourseDetails(course: {}): void {
    this.router.navigate(['user/contentDetails']);
    this.courseDetails = JSON.stringify(course)
    localStorage.setItem('courseDetails', this.courseDetails);
    console.log(this.courseDetails);
  }

  ngOnDestroy(): void {
    this.contentGetSubscriptions$.unsubscribe();
  }
}