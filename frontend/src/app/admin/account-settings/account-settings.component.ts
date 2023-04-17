import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
  providers:[MessageService]
})
export class AccountSettingsComponent implements OnInit {


constructor(private messageSrvice:MessageService){}
  public currentEmail!: string;
  public currentPassword!: string;
  public newEmail!: string;
  public enteredPassword!: string;
  public Repassword!: string;
  public newpassword!: string;


  displayPasswordModal!: boolean;
  displayEmailModal!: boolean;

  selectedCities: string[] = [];
  ngOnInit(): void {
    //  localStorage.setItem('adminDetails', JSON.stringify(this.adminDetails))
  }

  public onEmailEdit(): void {
    this.displayEmailModal = true;
  }
  public changeEmail(): void {
    if (this.enteredPassword === this.currentPassword) {
      this.currentEmail = this.newEmail;

      const newEmailDetails = {
        email: this.currentEmail,
        password: this.currentPassword
      }
      localStorage.setItem('adminNewDetails', JSON.stringify(newEmailDetails))
      this.displayEmailModal = false;
    }
    else {
      this.messageSrvice.add({severity:'error',summary:'Invalid password',detail:'Please enter correct password !!'});
    }
  }
  public onPasswordEdit():void {
    this.displayPasswordModal = true;
  }
  public changePassword(): void {
    if (this.enteredPassword === this.currentPassword && this.newpassword == this.Repassword) {
      this.currentPassword = this.newpassword

      const newPasswordDetails = {
        email: this.currentEmail,
        password: this.newpassword
      }
      localStorage.setItem('adminNewPasswordDetails', JSON.stringify(newPasswordDetails))
      this.displayEmailModal = false;

    }
  }
}
