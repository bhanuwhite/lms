import { CUSTOM_ELEMENTS_SCHEMA, forwardRef, NgModule } from '@angular/core';
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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CourseDetailsComponent } from './course-details/course-details.component';

import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { MatTabsModule } from '@angular/material/tabs';
import { AboutComponent } from './about/about.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { AvatarModule } from 'primeng/avatar';
import { UserFooterComponent } from './user-footer/user-footer.component';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    UserComponent,
    MyLibraryComponent,
    CourseDetailsComponent,
    AboutComponent,
    UserHeaderComponent,
    UserFooterComponent,
    ContentDetailsComponent

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SheredModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
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
    MatProgressBarModule,
    MatTabsModule,
    AccordionModule,
    CheckboxModule,
    AvatarModule,
    CardModule,
    RatingModule,
    NgbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
}
)
export class UserModule { }
