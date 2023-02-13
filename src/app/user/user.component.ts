import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from '../services/api.service';
import courseList from '../../assets/data/courseDetails.json';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers:[MessageService]
})
export class UserComponent implements OnInit {
  contentData!: any;
  public val: number=3;
  msg: string | undefined;

  isLoading: boolean = false;
  public items: any;
  public courseList: {id:number,courseImage:string,courseTitle:string,author:string,rating:number,price:number}[]=courseList;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private messageService: MessageService
  ) {

  }

  ngOnInit(): void {
    this.iconMenu();
    this.getContent();

    // console.log(courseList[0].courseTitle);
    // for(let i=0;i<=courseList.length;i++){

    //   this.val=courseList[i].rating;
    // }

  }


  public iconMenu(): void {
    this.items = [{
      label: 'Action',
      items: [{
        label: 'Logout',
        icon: 'pi pi-sign-out mt-0 text-danger',
        command: () => {
          this.onLogout();
        }
      },
      {
        label: 'Change Password',
        icon: 'pi pi-key ',
        command: () => {

        }
      }
      ]
    },

    ];
  }

  public onLogout(): void {
    this.router.navigateByUrl('/login');
    localStorage.clear();
    location.reload();
  }

  public getContent(): void {
    this.isLoading = true;
    this.apiService.getContent().subscribe(res => {
      try {
        this.contentData = res.data;
        console.log(this.contentData);
        this.isLoading = false;
      } catch (error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Somethinng went to wrong !!' });
      }
    });
  }




}
