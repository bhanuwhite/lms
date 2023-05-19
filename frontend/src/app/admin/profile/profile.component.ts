import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { userProfile } from 'src/app/models/profile';

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
  userProfileDataFromLocalStorage: any = {
    biography: '',
    firstname: '',
    lastname: '',
    linkedin: '',
    mobileNo:0,
    email:'',
    selectedlanguages: [],
    website: ''
  }
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
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
  //userProfileForm
  public userProfile(): void {
    this.userProfileForm = this.fb.group({
      firstname: new FormControl('', [Validators.required, Validators.minLength(8)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(8)]),
      headline: new FormControl('', [Validators.required, Validators.minLength(10)]),
      biography: new FormControl('', [Validators.required, Validators.minLength(10)]),
      website: new FormControl('', [Validators.required, Validators.minLength(5)]),
      twitter: new FormControl('', [Validators.required, Validators.minLength(5)]),
      linkedin: new FormControl('', [Validators.required, Validators.minLength(5)]),
      facebook: new FormControl('', [Validators.required, Validators.minLength(5)]),
      youtube: new FormControl('', [Validators.required, Validators.minLength(5)]),
      selectedlanguages: new FormControl('', [Validators.required, Validators.minLength(2)])
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
    localStorage.setItem("userProfileForm", JSON.stringify(this.userProfileForm.value));
    this.userProfileDataFromLocalStorage = JSON.parse(localStorage.getItem("userProfileForm") as string);
    this.userProfileForm.reset();
    window.alert("Profile values saved");
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

  //for vaidations profile form

  public get firstname() {
    return this.userProfileForm.get('firstname')
  }
  public get lastname() {
    return this.userProfileForm.get('lastname');
  }
  public get headline() {
    return this.userProfileForm.get('headline');
  }
  public get biography() {
    return this.userProfileForm.get('biography');
  }
  public get website() {
    return this.userProfileForm.get('website');
  }
  public get twitter() {
    return this.userProfileForm.get('twitter');
  }
  public get linkedin() {
    return this.userProfileForm.get('linkedin');
  }
  public get facebook() {
    return this.userProfileForm.get('facebook');
  }
  public get youtube() {
    return this.userProfileForm.get('youtube');
  }
  public get selectedlanguages() {
    return this.userProfileForm.get('selectedlanguages');
  }

  //image validations
  public get imageControl() {
    return this.userProfileForm.get('imageControl');
  }
}
