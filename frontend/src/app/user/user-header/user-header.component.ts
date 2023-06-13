import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AboutService } from 'src/app/services/about.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss'],
})
export class UserHeaderComponent implements OnInit {
  public items: any;
  userID!: number;
  cartLength!: number;
  constructor(
    private router: Router,
    private apiservice: ApiService,
    private aboutService: AboutService
  ) {
    this.aboutService.userCart$.subscribe(
      (value: number) => (this.cartLength = value)
    );
  }

  ngOnInit(): void {
    this.iconMenu();
  }

  public iconMenu(): void {
    this.items = [
      {
        label: 'Action',
        items: [
          {
            label: 'Messages',
            icon: 'pi pi-comments ',
            command: () => {
              this.router.navigateByUrl('user/message');
            },
          },
          {
            label: 'Purchase History',
            icon: 'pi pi-cart-plus',
            command: () => {
              this.router.navigateByUrl('/user/purchase-history');
            },
          },
          {
            label: 'Change Password',
            icon: 'pi pi-key ',
            command: () => {},
          },
          {
            label: 'Profile',
            icon: 'pi pi-user',
            command: () => {
              this.router.navigateByUrl('/user/profile');
            },
          },
          {
            label: 'Account settings',
            icon: 'pi pi-cog',
            command: () => {
              this.router.navigateByUrl('/user/account-settings');
            },
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out mt-0 text-danger',
            command: () => {
              this.onLogout();
            },
          },
        ],
      },
    ];
  }

  public onLogout(): void {
    this.router.navigateByUrl('/login');
    localStorage.clear();
  }
}
