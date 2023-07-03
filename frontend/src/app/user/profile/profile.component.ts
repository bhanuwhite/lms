import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { userProfile, userUpdateProfile } from 'src/app/models/profile';
import { ApiService } from 'src/app/services/api.service';
import { Message, MessageService } from 'primeng/api';

interface Languages {
  name: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  public mainLanguages: Languages[] = [];
  public selectedLangauges: Languages[] = [];
  public selectedValues: string[] = [];
  public userProfileForm!: FormGroup;
  public userImageForm!: FormGroup;
  public imageData: string = '';
  public imageFileSelected = false;
  public reader!: FileReader;
  public userProfileSettings: string[] = [];
  public userDetails!: userUpdateProfile;
  public remainingWords: number = 50;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService
  ) {}

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

  public userLoginEmail!: string;
  userId!: number;
  loginUserName!: string;
  userFirstName!: string;
  userLastName!: string;
  mobileNo!: number;
  linkedin!: string;
  biograpy!: string;

  //login Details
  public getLocalStorage() {
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
          // this.linkedin = res.linkedIn;
          this.biograpy = res.biography;
        }
      });
    });
  }

  //userProfileForm
  public userProfile(): void {
    this.userProfileForm = this.fb.group({
      username: new FormControl({ value: this.loginUserName, disabled: true }),
      firstname: new FormControl(this.userFirstName, [
        Validators.required,
        Validators.pattern(/^[A-Za-z]*$/),
      ]),
      lastname: new FormControl(this.userLastName, [
        Validators.required,
        Validators.pattern(/^[A-Za-z]*$/),
      ]),
      email: new FormControl({ value: this.userLoginEmail, disabled: true }),
      mobileNo: new FormControl(this.mobileNo, [
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern('^[0-9]{10}$'),
      ]),
      biography: new FormControl(this.biograpy),
      // linkedin: new FormControl(this.linkedin),
    });
  }

  get mobileNumberControl() {
    return this.userProfileForm.get('mobileNumber');
  }
  get biographyControl() {
    return this.userProfileForm.get('biograpy');
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
      .subscribe((res) => {
        this.messageService.add({
          severity: 'info',
          summary: 'information',
          detail: 'Profile details updated',
        });
      });
  }

  //image validations
  public get imageControl() {
    return this.userProfileForm.get('imageControl');
  }

  //onImageFilesubmition
  public onImageUpload(event: any): void {
    this.reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      this.reader.readAsDataURL(file);
      this.reader.onload = () => {
        this.userImageForm.patchValue({
          imageControl: this.reader.result,
        });
        this.imageFileSelected = true;
        this.imageData = this.userImageForm.value.imageControl;
      };
    }
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

  //save image
  public saveImage(): void {}

  //saveProfileSettingValues
  public savingProfileSettingValues(): void {}
}
