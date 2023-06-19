import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { userProfile, userUpdateProfile } from 'src/app/models/profile';
import { ApiService } from 'src/app/services/api.service';

interface Languages {
  name: string
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  public mainLanguages: Languages[] = []
  public selectedLangauges: Languages[] = []
  public selectedValues: string[] = [];
  public userProfileForm!: FormGroup;
  public userImageForm!: FormGroup;
  public imageData: string = 'https://static.vecteezy.com/system/resources/previews/000/376/355/original/user-management-vector-icon.jpg'
  public reader!: FileReader;
  public userProfileSettings: string[] = [];
  loginUserName!: string;
  userFirstName!: string;
  userLastName!: string;
  userLoginEmail!: string;
  mobileNo!: number;
  linkedin!:string
  biograpy!: string;
  public userDetails !:userUpdateProfile;
  userId!: number;


  constructor(private fb: FormBuilder, private apiService: ApiService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.getLocalStorage();
    this.getLanguages();
    this.userProfile();
    setTimeout(() => {
    this.userProfile();

    }, 2000);
    this.userImage();
  }
  //get Langquages in multiselect items
  public getLanguages(): void {
    this.mainLanguages = [
      {
        name: 'English',
      },
      {
        name: 'Telugu',
      },
      {
        name: 'Hindhi',
      },
    ];
  }


  //login Details
  public getLocalStorage() {
    const userLoginData = JSON.parse(localStorage.getItem('user')!)
    console.log(userLoginData);

    this.apiService.getProfileDetails().subscribe((res) => {
             console.log(res);


      const allUserDetails = res;
      allUserDetails.filter((res:userProfile) => {


        if (userLoginData.id == res.id) {


          this.userLoginEmail = res.email;
          this.userId = res.id;
          this.loginUserName = res.username;
           this.userFirstName =res.firstname;
           this.userLastName=res.lastname;
           this.mobileNo=res.mobile;
           this.linkedin =res.linkedIn;
           this.biograpy =res.biography;
          console.log(this.userLoginEmail);
          console.log(this.loginUserName);


        }
      })


    })

  }


  //userProfileForm
  public userProfile(): void {
    this.userProfileForm = this.fb.group({
      username: new FormControl({ value: this.loginUserName, disabled: true }),
      firstname: new FormControl(this.userFirstName, [
        Validators.required,
        Validators.pattern(/^[A-Za-z][^0-9]*$/),
      ]),
      lastname: new FormControl(this.userLastName, [
        Validators.required,
        Validators.pattern(/^[A-Za-z][^0-9]*$/),
      ]),
      email: new FormControl({ value: this.userLoginEmail, disabled: true }),
      mobileNo: new FormControl(this.mobileNo, [
        Validators.maxLength(10),
        Validators.minLength(10)
      ]),
    })
  }
  //ImageForm
  public userImage(): void {
    this.userImageForm = this.fb.group({
      imageControl: ['', Validators.required]
    })
  }
  //onUserProfileSubmition
  public onUserProfileSubmit(): void {

    this.userDetails = {

      "username": this.userProfileForm.value.username,
      "firstname": this.userProfileForm.value.firstname,
      "lastname": this.userProfileForm.value.lastname,
      "email": this.userProfileForm.value.email,
      "mobile": this.userProfileForm.value.mobileNo,
      "biography": this.userProfileForm.value.biography,
      "linkedIn": this.userProfileForm.value.linkedin,


    }

    this.apiService.updateProfileDetails(this.userId, this.userDetails).subscribe((res) => {
      console.log(res);
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Profile details updated' });
    })


  }
  //onImageFilesubmition
  public onImageUpload(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const reader = new FileReader();
    if (target.files && target.files.length) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.userImageForm.patchValue({
          imageControl: reader.result
        })
        this.imageData = this.userImageForm.value.imageControl;
      }
      alert("Image for preview")
    }
  }
  //save image
  public saveImage(): void {
    localStorage.setItem("userImageform", JSON.stringify(this.userImageForm.value.imageControl));
    this.imageData = '';
    this.imageData = JSON.parse(localStorage.getItem("userImageform") as string);
    window.alert("image saved");
  }
  //saveProfileSettingValues
  public savingProfileSettingValues(): void {
    localStorage.setItem("profileSettingValues", JSON.stringify(this.selectedValues));
    this.userProfileSettings = JSON.parse(localStorage.getItem("profileSettingValues") as string);
    alert("Setting values saved");
  }

    //image validations
  public get imageControl() {
    return this.userProfileForm.get('imageControl');
  }
}
