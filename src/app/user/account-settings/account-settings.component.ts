import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent{
  displayPasswordModal!: boolean;
  displayEmailModal!: boolean;
  userCurrentPassword!: string;
  userCurrentEmail!: string;
  userEnteredPassword!: string;
  userNewEmail!: string;
  userRePassword!: string;
  userNewPassword!: string;
  selectedCities: string[] = [];
formData: any;



  onEmailEdit() {
    this.displayEmailModal = true;
  }
  changeUserEmail() {
    if (this.userEnteredPassword === this.userCurrentPassword) {
      this.userCurrentEmail = this.userNewEmail;

     const userNewDetails = {
        email: this.userNewEmail,
        password: this.userCurrentPassword,
      };

      localStorage.setItem('userDetails', JSON.stringify(userNewDetails));
      this.displayEmailModal = false;
    }
    else{
      console.log("enter currect password");

    }
  }
  onPasswordEdit() {
    console.log('hello');
    this.displayPasswordModal = true;
  }
  changeUserPassword() {
    if (
      this.userEnteredPassword === this.userCurrentPassword &&
      this.userNewPassword === this.userRePassword
    ) {
      this.userCurrentPassword = this.userNewPassword;
      const userNewPasswordDetails = {
        email: this.userCurrentEmail,
        password: this.userNewPassword,
      };
      localStorage.setItem(
        'userNewPasswordDetails',
        JSON.stringify(userNewPasswordDetails)
      );
      this.displayPasswordModal = false;
    } else {
      console.log(this.userEnteredPassword);

      console.log('enter your correct password');
    }
  }


}
