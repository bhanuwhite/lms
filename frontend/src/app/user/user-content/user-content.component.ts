import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AllCourseContentData, ContentResponse } from 'src/app/models/content';
import { LibraryObjectData, UserLibraryGetResponseData } from 'src/app/models/user-library';
@Component({
  selector: 'app-user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.scss'],
})
export class UserContentComponent {
  private contentGetSubscriptions$: Subscription = new Subscription();
  public currentRate: number = 2;
  Spinner: boolean = true;
  public isLoading: boolean = false;
  public coursesList: AllCourseContentData[] = [];
  public courseList2:AllCourseContentData[] =[];
  public items: ContentResponse[] = [];
  public searchWord: string = "";
  public libDataId: number[] = [];
   public showPurchase: boolean = false;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getContent();
    this.getLibraryItems();
  }

  parsePrice(price: string): number {
    return parseInt(price, 10);
  }

  public getLibraryItems() {
    this.apiService.getContentLibrary().subscribe((res) => {
      this.libDataId = res.data.map(
        (obj: UserLibraryGetResponseData) => obj.attributes.course_content.data?.id
      );
    });
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
        this.Spinner = false;
        this.coursesList = res.data;
        this.courseList2 = res.data
        console.log("User Content",this.coursesList);

        this.items = res.data;
        this.isLoading = true;
      } catch (error) {
        console.log(error);
      }
    });
  }

  public searchFunction() {
    if(this.searchWord){
      this.coursesList = this.courseList2.filter((course:any)=>

        course.attributes.name.toLowerCase().includes(this.searchWord.toLowerCase()) ||
        course.attributes.price.toLowerCase().includes(this.searchWord.toLowerCase())


      )
    }
    else {
      this.coursesList = this.courseList2
    }
    // this.coursesList = this.items.filter((course:any) => course.attributes.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || course.attributes.author.toLowerCase().includes(this.searchQuery.toLowerCase()) || course.attributes.price.includes(this.searchQuery));
  }

  ngOnDestroy(): void {
    this.contentGetSubscriptions$.unsubscribe();
  }
}
