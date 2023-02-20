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
import {CardModule} from 'primeng/card'
import {RatingModule} from 'primeng/rating';
import {MatTabsModule} from '@angular/material/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { HeaderComponent } from './header/header.component';
import {AccordionModule} from 'primeng/accordion';

@NgModule({
  declarations: [
    UserComponent,
    MyLibraryComponent,
    CourseDetailsComponent,
    HeaderComponent
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
    AdminRoutingModule, MatIconModule, MenuModule, DialogModule, TooltipModule, ButtonModule,CardModule,RatingModule,MatTabsModule,
    NgbModule,
    AccordionModule
  ]
})
export class UserModule { }
