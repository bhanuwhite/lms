import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { dropDown } from 'src/app/interface';
import { ApiService } from 'src/app/services/api.service';
import { each } from 'chart.js/dist/helpers/helpers.core';
import { getContentLibrary, userLibrary } from 'src/app/models/content';

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.scss'],
  providers:[ConfirmationService]
})
export class MyLibraryComponent implements OnInit {
  items!: MenuItem[];
  searchWord: string = '';
  // public course_Details: any = [];
  // public course_Details2: any = [];
  public value: number = 10;
  public progressValue: number = 25;

  courseDetailsJSON = '../../assets/course_details/courseDetails.json';
  public recentlyAccessDropdown: dropDown[] = [];
  public selectedRecentlyAccess: string = '';
  public categoryDropdown: dropDown[] = [];
  public selectedCategory: string = '';
  public progressDropdown: dropDown[] = [];
  public selectedProgress: string = '';
  public instructorDropdown: dropDown[] = [];
  public selectedInstructor: string = '';
  loadingSpinner: boolean = false;


    constructor(private httpClient: HttpClient, private apiService: ApiService,   private confirmationService: ConfirmationService,) {}

  ngOnInit(): void {
    this.getContentLibrary();
  }

  public courseData: any = [];

 public courseDetails:userLibrary[]=[]


  public getContentLibrary() {

    this.loadingSpinner = true;
    this.apiService.getContentLibrary().subscribe((res) => {
      console.log(res);

      try {
        console.log(res.data[0].attributes);
        this.courseData = res.data;
    this.loadingSpinner = true;

      } catch (error) {
        console.log(error);
      }
    });

  }
  public searchData !:any;

  public searchFun() {
    this.searchData = this.courseData.filter((each: any) =>
      each.title.toLowerCase().includes(this.searchWord.toLowerCase())
    );
    console.log(this.searchWord);

  }

  public myCourseDetails(courseDetails: object): void {
// console.log(courseDetails);

  }

  deleteUserCourseLibrary(course:any){

    this.confirmationService.confirm({
      message: `Do you want to delete - ${course.attributes?.name} ?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
    this.apiService.deleteContentLibrary(course.id).subscribe((res) => {
      console.log(res);

      try {
      this.loadingSpinner = true;
      } catch (error) {
        console.log(error);
      }
    });
  }
  });
  this.getContentLibrary();
}
  }

  // public deleteDialog(data: ContentResponse): void {
  //   this.confirmationService.confirm({
  //     message: `Do you want to delete - ${data.attributes?.name} ?`,
  //     header: 'Delete Confirmation',
  //     icon: 'pi pi-info-circle',
  //     accept: () => {
  //       this.apiService.deleteContent(data.id).subscribe((res) => {
  //         console.log(res);
  //         console.log(data.id);

  //         try {
  //           this.messageService.add({
  //             severity: 'error',
  //             summary: 'Delete',
  //             detail: 'Content deleted successfully !',
  //           });
  //           this.getContent();
  //         } catch (error) {
  //           this.messageService.add({
  //             severity: 'error',
  //             summary: 'Error',
  //             detail: 'Something went to wrong !!',
  //           });
  //         }
  //       });
  //     },
  //     reject: () => {},
  //   });
  // }
// }
