import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { UserDetails } from 'src/app/models/track';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-trackuser',
  templateUrl: './trackuser.component.html',
  styleUrls: ['./trackuser.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class TrackuserComponent implements OnInit, OnDestroy {
  public allUsersData: UserDetails[] = [];
  private TrackRes$: Subscription = new Subscription();

  constructor(
    private apiservivce: ApiService,
    public router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getTrackApi();
  }

  public getTrackApi(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiservivce.getAllUers().subscribe((res) => {
        this.allUsersData = res.filter((resObj: UserDetails) => {
          return resObj.role_id == 3;
        });
      });
      resolve();
      (err: any) => {
        reject(err);
      };
    });
  }


  public showTrackDetails(id: number): void {
    this.router.navigate(['trackuser/', id]);
  }

  public blockUser(users: any): void {
    if (users.blocked == false) {
      this.confirmationService.confirm({
        message: `Are sure to Lock ${users.username} account ?`,
        header: 'Confirmation',

        accept: () => {
          try {
            const updateUser = {
              blocked: true,
            };
            this.apiservivce
              .updateProfileDetails(users.id, updateUser)
              .subscribe((res) => {
                this.getTrackApi();
              });
          } catch (err: any) {
            console.warn(err);
          }
          this.messageService.add({
            severity: 'success',
            summary: 'Confirmed',
            detail: `${users.username} account has been locked`,
          });
        },
        reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Cancelled' });
        },
      });
    }

    if (users.blocked == true) {
      this.confirmationService.confirm({
        message: `Are sure to Unlock ${users.username} account ?`,
        header: 'Confirmation',
        accept: () => {
          try {
            const updateUser = {
              blocked: false,
            };
            this.apiservivce
              .updateProfileDetails(users.id, updateUser)
              .subscribe((res) => {
                this.getTrackApi();
              });
          } catch (err: any) {
            console.warn(err);
          }
          this.messageService.add({
            severity: 'success',
            summary: 'Confirmed',
            detail: `${users.username} has been Unlocked`,
          });
        },
        reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Cancelled' });
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.TrackRes$.unsubscribe();
  }
}
