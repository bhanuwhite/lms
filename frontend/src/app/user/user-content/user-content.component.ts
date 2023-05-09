import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { ContentResponse } from 'src/app/models/content';
@Component({
  selector: 'app-user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.scss'],
})
export class UserContentComponent {
  private contentGetSubscriptions$: Subscription = new Subscription();
  public currentRate: number = 2;
  Spinner:boolean = true;
  public isLoading: boolean = false;

  public coursesList!: ContentResponse[];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getContent();
    this.getLibraryItems();
  }

  libData:any;
  libDataId:number[]=[];
  showPurchase:boolean = false;
  public getLibraryItems(){
    this.apiService.getContentLibrary().subscribe((res)=>{
      console.log("Getting Library data",res);
      this.libData = res.data;
      this.libDataId = this.libData.map((obj:any)=> obj.attributes.content_library.data.id );
      console.log(this.libDataId);

    })
  }

  // Logout
  public onLogout(): void {
    this.router.navigateByUrl('/login');
    localStorage.clear();
    location.reload();
  }

  // Get Content
  public getContent(): void {
    this.apiService.getContent().subscribe((res) => {
      try {
        console.log(res.data);
        this.Spinner = false
        this.coursesList = res.data;
        this.isLoading = true;
      } catch (error) {
        console.log(error);
      }

    });
  }
  public courseDetails!: string;

  public openCourseDetails(course: {}): void {
    // this.router.navigate(['user/contentDetails']);
    console.log("single course ",course);

    // this.courseDetails = JSON.stringify(course);
    // localStorage.setItem('courseDetails', this.courseDetails);
  }

  ngOnDestroy(): void {
    this.contentGetSubscriptions$.unsubscribe();
  }
}
