import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AboutService } from 'src/app/services/about.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss'],
  providers: [MessageService],
})
export class UserHeaderComponent implements OnInit {
  public items: any;
  userID!: number;
  cartLength!: number;
  passwordDialog: boolean = false;
  changePassword!: FormGroup;
  public toNewPassword: boolean = true;
  visibleSidebar1!: boolean;
  constructor(
    private router: Router,
    private aboutService: AboutService,
    private fb: FormBuilder,
    private authService: AuthService,
    private messageservice: MessageService
  ) {
    this.aboutService.userCart$.subscribe(
      (value: number) => (this.cartLength = value)
    );
  }

  ngOnInit(): void {
    this.getLocalData();
    this.passwordForm();
    this.iconMenu();
  }

  public iconMenu(): void {
    this.items = [
      {
        label: 'Action',
        items: [
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
            command: () => {
              onclick;
              this.showPasswordForm();
            },
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

  userEmail!: string;
  public getLocalData(): Promise<void> {
    return new Promise((resolve, reject) => {
      const LocalData = JSON.parse(localStorage.getItem('user')!);
      this.userEmail = LocalData?.email;
      resolve(),
        (err: any) => {
          reject(err);
        };
    });
  }

  public passwordForm(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.changePassword = this.fb.group({
        email: new FormControl(this.userEmail),
        oldPassword: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      });
      resolve(),
        (err: any) => {
          reject(err);
        };
    });
  }

  public showPasswordForm() {
    this.passwordDialog = true;
  }

  public cancelForm() {
    this.passwordDialog = false;
  }

  public isActive(base: string): boolean {
    return this.router.url === base; //.includes(`${base}`);
  }

  currentPwdInput: boolean = false;
  public changePassowrdSubmit(): void {
    let body = this.changePassword.value;
    const postData = {
      currentPassword: this.changePassword.value.oldPassword,
      password: this.changePassword.value.newPassword,
      passwordConfirmation: this.changePassword.value.confirmPassword,
    };

    this.authService.resetPassword(postData).subscribe(
      (res) => {
        this.passwordDialog = false;
        this.changePassword.reset();
      },
      (error: any) => {
        this.currentPwdInput = !this.currentPwdInput;
        this.messageservice.add({
          severity: 'error',
          summary: 'Please enter Valid current Password',
        });
        setTimeout(() => {
          this.currentPwdInput = !this.currentPwdInput;
        }, 3000);
      }
    );
  }

  public onLogout(): void {
    this.router.navigateByUrl('/login');
    localStorage.clear();
  }
}
