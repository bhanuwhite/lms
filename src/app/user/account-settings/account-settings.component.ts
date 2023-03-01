import { Component } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent {

  displayPasswordModal!:boolean;
  displayEmailModal!: boolean;
  email!:string;
  password!:string;
  selectedCities: string[] = [];

  onEmailEdit(){
    console.log("hello");
    this.displayEmailModal = true;
  }
  onPasswordEdit(){
    console.log("hello");
    this.displayPasswordModal = true;
  }

}
