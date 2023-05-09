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

  public isLoading: boolean = false;

  public coursesList!: ContentResponse[];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getContent();
    this.getUserLibrary();
  }

  // Logout
  public onLogout(): void {
    this.router.navigateByUrl('/login');
    localStorage.clear();
    location.reload();
  }

  public libraryContent: any

  // Get Content
  public getContent(): void {
    this.apiService.getContent().subscribe((res) => {
      try {
        console.log(res.data);
        this.coursesList = res.data;
        this.isLoading = true;

      } catch (error) {
        console.log(error);
      }

    });
  }




  public openCourseDetails(course: {}): void {
    console.log("single course ", course);
  }
  public courseId: number[]=[];

  public getUserLibrary() {

    this.apiService.getContentLibrary().subscribe((res) => {
      this.libraryContent = res.data

      this.libraryContent.some((obj:any) =>{
        this.courseId.push(obj.attributes.content_library.data.id);
        console.log(this.courseId);
      })

    })

  }

  ngOnDestroy(): void {
    this.contentGetSubscriptions$.unsubscribe();
  }
}
