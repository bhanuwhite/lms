import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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

import { AboutComponent } from './about/about.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { AvatarModule } from 'primeng/avatar';
import { UserFooterComponent } from './user-footer/user-footer.component';

import {CardModule} from 'primeng/card'
import {RatingModule} from 'primeng/rating';
import {MatTabsModule} from '@angular/material/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CourseDetailsComponent } from './course-details/course-details.component';
import {AccordionModule} from 'primeng/accordion';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { MessageComponent } from './message/message.component';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    UserComponent,
    MyLibraryComponent,
    CourseDetailsComponent,
    AboutComponent,
    // HeaderComponent,
    UserHeaderComponent,
    UserFooterComponent,
    ContentDetailsComponent,
    MessageComponent
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
    AdminRoutingModule, MatIconModule, MenuModule, DialogModule, TooltipModule, ButtonModule,
    MenubarModule,
    TabMenuModule,
    ProgressBarModule,
    MatProgressBarModule,
    RatingModule,
    MatTabsModule,
    AvatarModule, MatIconModule, MenuModule, DialogModule, TooltipModule, ButtonModule, CardModule, RatingModule, MatTabsModule,
    AdminRoutingModule,
    NgbModule,
    AccordionModule,
    MatIconModule,
    MenuModule,
    DialogModule,
    TooltipModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    AvatarModule,
    EditorModule,
    HttpClientModule,
    TableModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class UserModule { }
