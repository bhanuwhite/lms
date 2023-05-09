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
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-community-forum',
  templateUrl: './community-forum.component.html',
  styleUrls: ['./community-forum.component.scss'],
providers: [MessageService,ConfirmationService],
})
export class CommunityForumComponent {
  like: string = 'thumb_up';
  displayDoubtImg!: boolean;
  localImgUrl: string[] = [];
  doubtImg: string = '';
  showCommunityForm: boolean = false;
  communityImgFile: any;
  spinner:boolean = true
  communityForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    public apiService: ApiService,
    private messageService: MessageService,
    public confirmationService:ConfirmationService
  ) {}

  ngOnInit(): void {
    this.CommunityForm();
    this.getCommunity()
  }
  // Community Form
  public CommunityForm(): void {
    this.communityForm = this.fb.group({
      community_Name: new FormControl('', [Validators.required]),
      community_Desc: new FormControl('', [Validators.required]),
      community_Img: new FormControl(''),
      community_ID: new FormControl('')
    });
  }
  GlobalCommunities:any
  public getCommunity(){
    console.log('Getting community');

    this.apiService.getCommunities().subscribe((res)=>{
      console.log("Communityies",res);
      this.GlobalCommunities = res.data
      this.spinner = false;
    })
  }
  public displayCommunityForm() {
    this.showCommunityForm = true;
  }
  public onFileSelect(event: Event): void {
    console.log(event);
    console.log("File has been selected");


    if (
      event.target instanceof HTMLInputElement &&
      event.target.files?.length
    ) {
      const file = event.target.files[0];
      this.communityForm.get('community_Img')?.setValue(file);
      const formData = new FormData();
      formData.append('files', this.communityForm.get('community_Img')?.value);
      this.apiService.uploadFile(formData).subscribe((res) => {
        console.log("Api is HItting.");

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
    const postCommunity = {
      data:{
        community_profile_media: this.communityImgFile,
        community_name: this.communityForm.value.community_Name,
        description: this.communityForm.value.community_Desc,
        community_id: this.communityForm.value.community_ID

      }
    }
    console.log(postCommunity);
    this.apiService.postCommunity(postCommunity).subscribe((res) => {
      try {
        this.messageService.add({
          severity: 'success',
          summary: 'Congratualations.',
          detail: 'Successfully Community added.',
        });
        this.getCommunity()
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error...',
          detail: 'Something went wrong !!',
        });
      }
    });
    this.showCommunityForm = false;
    this.communityForm.reset();

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

  public deleteCommunity(id:number){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this Community?',
      header: 'Delete Confirmation?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.messageService.add({ severity: 'success', detail: 'Community has been deleted.' });
          this.apiService.deleteCommunity(id).subscribe((res)=>{
            console.log(res);
            this.getCommunity();
          })
        },
      reject: (type:any) => {
          switch (type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                  break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                  break;
          }
      }
  });


  }

}
