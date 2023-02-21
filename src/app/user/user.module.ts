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
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [UserComponent, MyLibraryComponent, CourseDetailsComponent],
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
    AdminRoutingModule,
    MatIconModule,
    MenuModule,
    DialogModule,
    TooltipModule,
    ButtonModule,
    MenubarModule,
    TabMenuModule,
    ProgressBarModule,
    // MatProgressBarModule,
    RatingModule,
    CardModule,
    AccordionModule,
    CheckboxModule,
    FontAwesomeModule,
    DropdownModule,
    TabViewModule,
  ],
  providers: [],
})
export class UserModule {}
