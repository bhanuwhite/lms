import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MatIconModule } from '@angular/material/icon';
import { SheredModule } from '../component/shered.module';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../services/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RippleModule } from 'primeng/ripple';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { HeaderComponent } from './header/header.component';
import { QuizComponent } from './quiz/quiz.component';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { EditorModule } from 'primeng/editor';
import { TableModule } from 'primeng/table';
import { CoursesComponent } from './courses/courses.component';
import { TagModule } from 'primeng/tag';
import {SidebarModule} from 'primeng/sidebar';
import { CalendarModule } from 'primeng/calendar';
import {ChartModule} from 'primeng/chart';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ProgressBarModule} from 'primeng/progressbar';
import { SpinnerComponent } from '../component/spinner/spinner.component';
import { ContentComponent } from './content/content.component';
import { MegaMenuModule } from 'primeng/megamenu';
import {TabViewModule} from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { CourseDetailsComponent } from './course-details/course-details.component';
import {AccordionModule} from 'primeng/accordion';
import { MeetingsComponent } from './meetings/meetings.component';
import {CheckboxModule} from 'primeng/checkbox';
import {AvatarGroupModule} from 'primeng/avatargroup';
import { ProfileComponent } from './profile/profile.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { SplitterModule } from 'primeng/splitter';
import { DividerModule } from 'primeng/divider';
import { CommunityForumComponent } from './community-forum/community-forum.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BadgeModule } from 'primeng/badge';
import { CommunityQuestionsRepliesComponent } from './community-questions-replies/community-questions-replies.component';
import { InstructorsMessagesComponent } from './instructors-messages/instructors-messages.component';
import { ScrollerModule } from 'primeng/scroller';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { QuizDetailsComponent } from './quiz-details/quiz-details.component';
import { TrackuserComponent } from './trackuser/trackuser.component';
import { TrackDetailsComponent } from './track-details/track-details.component';

@NgModule({
  declarations: [
    AdminComponent,
    ContentDetailsComponent,
    HeaderComponent,
    QuizComponent,
    CoursesComponent,
    DashboardComponent,
    SpinnerComponent,
    ContentComponent,
    CourseDetailsComponent,
    MeetingsComponent,
    ProfileComponent,
    CommunityForumComponent,
    AccountSettingsComponent,
    CommunityQuestionsRepliesComponent,
    InstructorsMessagesComponent,
    QuizDetailsComponent,
    TrackuserComponent,
    TrackDetailsComponent

  ],
  imports: [
    CommonModule,
    SheredModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    RippleModule,
    ConfirmDialogModule,
    MessagesModule,
    ProgressSpinnerModule,
    PaginatorModule,
    CardModule,
    ToastModule,
    MenubarModule,
    AvatarModule,
    DividerModule,
    EditorModule,
    TableModule,
    AdminRoutingModule,
    MatIconModule,
    MenuModule,
    DialogModule,
    TooltipModule,
    ButtonModule,
    InputTextModule,
    TagModule,
    SidebarModule,
    ChartModule,
    CalendarModule,
    ProgressBarModule,
    MegaMenuModule,
    TabViewModule,
    AccordionModule,
    ToolbarModule,
    AvatarGroupModule,
    CheckboxModule,
    SplitterModule,
    MultiSelectModule,
    OverlayPanelModule,
    BadgeModule,
    ScrollPanelModule,
    ScrollerModule
  ],
  providers: [
    ApiService
  ]
})
export class AdminModule { }
