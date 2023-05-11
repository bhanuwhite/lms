import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  MenuItem } from 'primeng/api';
import { dropDown } from 'src/app/interface';
import { ApiService } from 'src/app/services/api.service';
import { each } from 'chart.js/dist/helpers/helpers.core';
import { getContentLibrary, userLibrary } from 'src/app/models/content';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class MyLibraryComponent implements OnInit {
  items!: MenuItem[];
  Spinner:boolean = true
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


    constructor(
    private httpClient: HttpClient,
    private apiService: ApiService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getContentLibrary();
  }

  public courseData: any = [];

  public courseDetails: userLibrary[] = [];



  public getContentLibrary() {
    this.loadingSpinner = true;
    this.apiService.getContentLibrary().subscribe((res) => {
      console.log(res);

      try {
        console.log(res.data[0].attributes);
        this.courseData = res.data;
        this.searchData =res.data;
        console.log(this.courseDetails);
        this.Spinner = false
        this.loadingSpinner = true;
    this.loadingSpinner = true;

      } catch (error) {
        console.log(error);
      }
    });
  }
  public searchData!: any[];

  public searchFun() {
    this.courseData = this.searchData.filter((course:any) => course.attributes.content_library.data.attributes.name.toLowerCase().includes(this.searchWord.toLowerCase()) || course.attributes.content_library.data.attributes.author.toLowerCase().includes(this.searchWord.toLowerCase()));
    console.log(this.searchWord);
  }

  public myCourseDetails(courseDetails: object): void {
console.log(courseDetails);
  }

  public removeCourse(id: number) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.apiService.removeLibraryCourse(id).subscribe((res) => {
          console.log(res);
          this.getContentLibrary();
        });
        this.messageService.add({
          severity: 'success',
          summary: 'Successfully',
          detail: 'Course removed',
        });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
  }
}

//   deleteUserCourseLibrary(course:any){

//     this.confirmationService.confirm({
//       message: `Do you want to delete - ${course.attributes?.name} ?`,
//       header: 'Delete Confirmation',
//       icon: 'pi pi-info-circle',
//       accept: () => {
//     this.apiService.deleteContentLibrary(course.id).subscribe((res) => {
//       console.log(res);

//       try {
//       this.loadingSpinner = true;
//       } catch (error) {
//         console.log(error);
//       }
//     });
//   }
//   });
//   this.getContentLibrary();
// }


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
