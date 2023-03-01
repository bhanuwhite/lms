import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { RippleModule } from 'primeng/ripple';
import { AdminRoutingModule } from '../admin/admin-routing.module';
import { SheredModule } from '../component/shered.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { MyLibraryComponent } from './my-library/my-library.component';
import {CardModule} from 'primeng/card';
import {RatingModule} from 'primeng/rating';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { HeaderComponent } from './header/header.component';
import {AccordionModule} from 'primeng/accordion';
import {TabViewModule} from 'primeng/tabview';
import { VideoPopUpComponent } from './video-pop-up/video-pop-up.component';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { PaymentComponent } from './payment/payment.component';
import {DropdownModule} from 'primeng/dropdown';
import {RadioButtonModule} from 'primeng/radiobutton';
import { FormsModule} from '@angular/forms';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import {CheckboxModule} from 'primeng/checkbox';


// import {DialogModule} from 'primeng/dialog';

@NgModule({
  declarations: [
    UserComponent,
    MyLibraryComponent,
    CourseDetailsComponent,
    HeaderComponent,
    VideoPopUpComponent,
    PaymentComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SheredModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    RippleModule,
    ConfirmDialogModule,
    MessagesModule,
    ProgressSpinnerModule,
    InputTextModule,
    FormsModule,
    CheckboxModule,

    AdminRoutingModule, MatIconModule, MenuModule, DialogModule, TooltipModule, ButtonModule,CardModule,RatingModule,

    AccordionModule,TabViewModule, DialogModule,DynamicDialogModule,DropdownModule,RadioButtonModule

  ]
})
export class UserModule { }
