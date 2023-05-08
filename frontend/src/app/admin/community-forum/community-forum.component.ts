import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  conversationObj,
  onlinePersonData,
  trendingObj,
} from 'src/app/interface';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-community-forum',
  templateUrl: './community-forum.component.html',
  styleUrls: ['./community-forum.component.scss'],
  providers: [MessageService],
})
export class CommunityForumComponent {
  like: string = 'thumb_up';
  displayDoubtImg!: boolean;
  localImgUrl: string[] = [];
  doubtImg: string = '';
  showCommunityForm: boolean = false;
  communityImgFile: any;

  communityForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    public apiService: ApiService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.CommunityForm();
  }
  // Community Form
  public CommunityForm(): void {
    this.communityForm = this.fb.group({
      community_Name: new FormControl('', [Validators.required]),
      community_Desc: new FormControl('', [Validators.required]),
      community_Img: new FormControl(''),
    });
  }
  public displayCommunityForm() {
    this.showCommunityForm = true;
  }
  public onFileSelect(event: Event): void {
    console.log(event);

    if (
      event.target instanceof HTMLInputElement &&
      event.target.files?.length
    ) {
      const file = event.target.files[0];
      this.communityForm.get('community_Img')?.setValue(file);
      const formData = new FormData();
      formData.append('files', this.communityForm.get('community_Img')?.value);
      this.apiService.uploadFile(formData).subscribe((res) => {
        try {
          console.log(res);
          this.communityImgFile = res;
        } catch (error) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went to wrong !!',
          });
        }
      });
    }
  }

  public closeDialog() {
    this.showCommunityForm = false;
    this.communityForm.reset();
  }
  public onSubmitCommunityForm() {
    const postBody = {
      community_name: this.communityForm.value.community_Name,
      community_profile_media: this.communityImgFile,
      community_description: this.communityForm.value.community_Desc,
    };
    console.log(postBody);
    this.apiService.postCommunity(postBody).subscribe((res) => {
      try {
        this.messageService.add({
          severity: 'success',
          summary: 'Congratualations.',
          detail: 'Successfully Community added.',
        });
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error...',
          detail: 'Something went wrong !!',
        });
      }
    });
  }

  public showDoubtImgDialog(image: string): void {
    this.doubtImg = image;
    this.displayDoubtImg = true;
  }
  public selectImg(event: any): void {
    for (let i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i].type.match(/image\/*/) == null) {
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[i]);
      reader.onload = (event: any) => {
        this.localImgUrl.push(event.target.result);
      };
    }
  }
}
