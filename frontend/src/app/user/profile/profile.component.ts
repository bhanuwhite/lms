import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { userProfile } from 'src/app/models/profile';
import { ApiService } from 'src/app/services/api.service';
import { Message, MessageService } from 'primeng/api';

interface Languages {
  name: string
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  public mainLanguages: Languages[] = []
  public selectedLangauges: Languages[] = []
  public selectedValues: string[] = [];
  public userProfileForm!: FormGroup;
  public userImageForm!: FormGroup;
  public imageData: string = ''
  public imageFileSelected = false
  public reader!: FileReader;
  public userProfileSettings: string[] = [];



  constructor(private fb: FormBuilder, private apiService: ApiService, private messageService: MessageService) {

  }

  ngOnInit(): void {

    this.getLocalStorage();
    this.getLanguages();
    this.userProfile();
    setTimeout(() => {
    this.userProfile();

    }, 2000);
    this.userImage();

  }
  //get tabmenu items
  public getLanguages(): void {
    this.mainLanguages = [
      {
        name: 'English',
      },
      {
        name: 'Telugu',
      },
      {
        name: 'Hindi',
      },
    ];
  }

  public userLoginEmail !: string;
  userId!: number;
  loginUserName!: string;
  userFirstName !:string;
 userLastName!:string;
 mobileNo!:number;
 linkedin!:string


  //login Details
  public getLocalStorage() {
    const userLoginData = JSON.parse(localStorage.getItem('user')!)
    console.log(userLoginData);



    this.apiService.getProfileDetails().subscribe((res) => {


      const allUserDetails = res;
      allUserDetails.filter((res: any) => {


        if (userLoginData.id == res.id) {
console.log(res);

          this.userLoginEmail = res.email;
          this.userId = res.id;
          this.loginUserName = res.username;
           this.userFirstName =res.firstname;
           this.userLastName=res.lastname;
           this.mobileNo=res.mobile;
           this.linkedin =res.linkedIn;
          console.log(this.userLoginEmail);
          console.log(this.loginUserName);


        }
      })


    })

  }





  //userProfileForm
  public userProfile(): void {

    console.log(this.userLoginEmail);
    console.log(this.loginUserName);

    this.userProfileForm = this.fb.group({
      username: new FormControl(this.loginUserName),
      firstname: new FormControl(this.userFirstName, [Validators.required]),
      lastname: new FormControl(this.userLastName, [Validators.required]),
      email: new FormControl(this.userLoginEmail),
      mobileNo: new FormControl(this.mobileNo),
      biography: new FormControl(''),
      linkedin: new FormControl(this.linkedin),
    })
    console.log(this.userProfileForm);

  }

  //ImageForm
  public userImage(): void {
    this.userImageForm = this.fb.group({
      imageControl: ['', Validators.required]
    })
  }

  //onUserProfileSubmition
  public onUserProfileSubmit(): void {

    console.log(this.userProfileForm.value)

    const userDetails: any = {


      "username": this.userProfileForm.value.username,
      "firstname": this.userProfileForm.value.firstname,
      "lastname": this.userProfileForm.value.lastname,
      "email": this.userProfileForm.value.email,
      "mobile": this.userProfileForm.value.mobileNo,
      "biography": this.userProfileForm.value.biography,
      "linkedIn": this.userProfileForm.value.linkedin,


    }

    this.apiService.updateProfileDetails(this.userId, userDetails).subscribe((res) => {
      console.log(res);
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Profile details updated' });
    })


    // this.loginUserName = this.userProfileForm.value.username;
    // this.userProfile();


  }



  //image validations
  public get imageControl() {
    return this.userProfileForm.get('imageControl')
  }

  //onImageFilesubmition
  public onImageUpload(event: any): void {

    this.reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      console.log(this.userImageForm.value);

      this.reader.readAsDataURL(file);
      this.reader.onload = () => {
        this.userImageForm.patchValue({
          imageControl: this.reader.result
        })
        this.imageFileSelected = true
        this.imageData = this.userImageForm.value.imageControl;
        }

    }
  }
  //save image
  public saveImage(): void {

  }

  //saveProfileSettingValues
  public savingProfileSettingValues(): void {

  }

}
