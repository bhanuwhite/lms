import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {
  public items: any;

  constructor(private router:Router) {

  }

  ngOnInit(): void {
    this.iconMenu();
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
        label: 'Messages',
        icon: 'pi pi-comments ',
        command: () => {
          this.router.navigateByUrl('user/message');
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
  }
}
