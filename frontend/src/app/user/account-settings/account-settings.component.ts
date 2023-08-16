import { Component } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent {
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

  public changeUserEmail(): void {
    if (this.userEnteredPassword === this.userCurrentPassword) {
      this.userCurrentEmail = this.userNewEmail;

      const userNewDetails = {
        email: this.userNewEmail,
        password: this.userCurrentPassword,
      };

      localStorage.setItem('userDetails', JSON.stringify(userNewDetails));
      this.displayEmailModal = false;
    }
    else {
      console.log("enter currect password");

    }
  }
  public onPasswordEdit(): void {
    this.displayPasswordModal = true;
  }
  public changeUserPassword(): void {
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

      console.log('enter your correct password');
    }
  }
}
