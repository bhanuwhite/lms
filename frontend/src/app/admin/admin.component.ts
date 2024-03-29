import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  styles: [
    `
      :host ::ng-deep button {
        margin-right: 0.25em;
      }
    `,
  ],
  providers: [ConfirmationService, MessageService],
})
export class AdminComponent implements OnInit {
  step: number = 2;
  visibleSidebar1!: boolean;
  showTechCat: boolean = false;
  items: any;
  public TechCat: any;
  techItems: any;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.iconMenu();
    this.techDropdown();
  }

  public isActive(base: string): boolean {
    return this.router.url === base;
  }

  public techDropdown(): void {
    this.techItems = [
      { name: 'Tech' },
      { name: 'Technology', code: 'tech' },
      { name: 'Category', code: 'cat' },
    ];
  }
  public iconMenu(): void {
    this.items = [
      {
        label: 'Action',
        items: [
          {
            label: 'Change Password',
            icon: 'pi pi-key ',
            command: () => {},
          },
          {
            label: 'Profile',
            icon: 'pi pi-user',
            command: () => {
              this.router.navigateByUrl('/admin/profile');
            },
          },
          {
            label: 'Account Settings',
            icon: 'pi pi-cog',
            command: () => {
              this.router.navigateByUrl('/admin/account-settings');
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

  // logout
  public onLogout(): void {
    this.router.navigateByUrl('/login');
    localStorage.clear();
  }
}
