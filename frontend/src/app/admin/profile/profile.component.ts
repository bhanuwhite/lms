import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { userProfile, userUpdateProfile } from 'src/app/models/profile';
import { ApiService } from 'src/app/services/api.service';

interface Languages {
  name: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public mainLanguages: Languages[] = [];
  public selectedLangauges: Languages[] = [];
  public selectedValues: string[] = [];
  public userProfileForm!: FormGroup;
  public userImageForm!: FormGroup;
  public imageData: string =
    'https://static.vecteezy.com/system/resources/previews/000/376/355/original/user-management-vector-icon.jpg';
  public reader!: FileReader;
  public userProfileSettings: string[] = [];
  loginUserName!: string;
  userFirstName!: string;
  userLastName!: string;
  userLoginEmail!: string;
  mobileNo!: number;
  linkedin!: string;
  biograpy!: string;
  public userDetails!: userUpdateProfile;
  userId!: number;
  remainingWords: number = 50;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.getLocalStorage().then(() => this.userProfile());
    this.getLanguages();
    this.userProfile();
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
  public getLocalStorage(): Promise<void> {
    return new Promise((resolve, reject) => {
      const userLoginData = JSON.parse(localStorage.getItem('user')!);
      this.apiService.getProfileDetails().subscribe((res) => {
        const allUserDetails = res;
        allUserDetails.filter((res: userProfile) => {
          if (userLoginData.id == res.id) {
            this.userLoginEmail = res.email;
            this.userId = res.id;
            this.loginUserName = res.username;
            this.userFirstName = res.firstname;
            this.userLastName = res.lastname;
            this.mobileNo = res.mobile;
            this.biograpy = res.biography;
          }
        });
        resolve(),
          (err: any) => {
            reject(err);
          };
      });
    });
  }

  //userProfileForm
  public userProfile(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.userProfileForm = this.fb.group({
        username: new FormControl({
          value: this.loginUserName,
          disabled: true,
        }),
        firstname: new FormControl(this.userFirstName, [
          Validators.required,
          Validators.pattern(/^[A-Za-z]*$/),
        ]),
        lastname: new FormControl(this.userLastName, [
          Validators.required,
          Validators.pattern(/^[A-Za-z]*$/),
        ]),
        email: new FormControl({ vlaue: this.userLoginEmail, disabled: true }),
        mobileno: new FormControl(this.mobileNo, [
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]{10}$'),
        ]),
        biography: new FormControl(this.biograpy),
        // linkedin: new FormControl(this.linkedin),
      });
      resolve(),
        (err: any) => {
          reject(err);
        };
    });
  }
  //ImageForm
  public userImage(): void {
    this.userImageForm = this.fb.group({
      imageControl: ['', Validators.required],
    });
  }
  //onUserProfileSubmition
  public onUserProfileSubmit(): void {
    this.userDetails = {
      username: this.userProfileForm.value.username,
      firstname: this.userProfileForm.value.firstname,
      lastname: this.userProfileForm.value.lastname,
      email: this.userProfileForm.value.email,
      mobile: this.userProfileForm.value.mobileNo,
      biography: this.userProfileForm.value.biography,
      // linkedIn: this.userProfileForm.value.linkedin,
    };

    this.apiService
      .updateProfileDetails(this.userId, this.userDetails)
      .subscribe(
        (res) => {
          this.messageService.add({
            severity: 'info',
            summary: 'Info',
            detail: 'Profile details are updated',
          });
        },
        (err: any) => {
          console.log(err);
        }
      );
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
          imageControl: reader.result,
        });
        this.imageData = this.userImageForm.value.imageControl;
      };
      alert('Image for preview');
    }
  }
  //save image
  public saveImage(): void {
    localStorage.setItem(
      'userImageform',
      JSON.stringify(this.userImageForm.value.imageControl)
    );
    this.imageData = '';
    this.imageData = JSON.parse(
      localStorage.getItem('userImageform') as string
    );
    window.alert('image saved');
  }
  //saveProfileSettingValues
  public savingProfileSettingValues(): void {
    localStorage.setItem(
      'profileSettingValues',
      JSON.stringify(this.selectedValues)
    );
    this.userProfileSettings = JSON.parse(
      localStorage.getItem('profileSettingValues') as string
    );
    alert('Setting values saved');
  }

  checkWordCount() {
    const textValue = this.userProfileForm.controls['biography'].value;
    const wordCount = textValue?.trim().split(/\s+/).length;
    this.remainingWords = 50 - wordCount;

    if (this.remainingWords < 0) {
      const words = textValue.trim().split(/\s+/);
      this.userProfileForm.controls['biography'].setValue(
        words.slice(0, 50).join(' ')
      );
      this.remainingWords = 0;
    }
  }

  //image validations
  public get imageControl() {
    return this.userProfileForm.get('imageControl');
  }
}
