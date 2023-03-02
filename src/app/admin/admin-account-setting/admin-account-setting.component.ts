import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-account-setting',
  templateUrl: './admin-account-setting.component.html',
  styleUrls: ['./admin-account-setting.component.scss']
})
export class AdminAccountSettingComponent implements OnInit {

  ngOnInit(): void {
    //  localStorage.setItem('adminDetails', JSON.stringify(this.adminDetails))
  }
// public adminDetails:{}={
//     email:"admin.lms@gmail.com",
//     password:"Admin@123"
//   }
  public currentEmail!:string;
  public currentPassword!:string;
  public newEmail!:string;
  public enteredPassword!:string;
  public Repassword!: string;
  public newpassword!:string;


  displayPasswordModal!:boolean;
  displayEmailModal!: boolean;

  selectedCities: string[] = [];

  onEmailEdit(){
    this.displayEmailModal = true;
  }
  changeEmail(){
    if(this.enteredPassword===this.currentPassword){
             this.currentEmail=this.newEmail;

             const newEmailDetails={
              email:this.currentEmail,
              password:this.currentPassword
               }
            localStorage.setItem('adminNewDetails',JSON.stringify(newEmailDetails))
            this.displayEmailModal = false;
    }
    else{
      alert("enter correct password")
    }

  }
  onPasswordEdit(){
    this.displayPasswordModal = true;
  }
  changePassword(){
     if(this.enteredPassword===this.currentPassword  && this.newpassword== this.Repassword){
         this.currentPassword=this.newpassword

         const newPasswordDetails={
          email:this.currentEmail,
          password:this.newpassword
           }
           localStorage.setItem('adminNewPasswordDetails',JSON.stringify(newPasswordDetails))
            this.displayEmailModal = false;

     }
  }
}
