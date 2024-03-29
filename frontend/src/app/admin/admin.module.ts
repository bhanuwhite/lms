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
import { TagModule } from 'primeng/tag';
import { SidebarModule } from 'primeng/sidebar';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { SpinnerComponent } from '../component/spinner/spinner.component';
import { ContentComponent } from './content/content.component';
import { MegaMenuModule } from 'primeng/megamenu';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ProfileComponent } from './profile/profile.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { SplitterModule } from 'primeng/splitter';
import { DividerModule } from 'primeng/divider';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BadgeModule } from 'primeng/badge';
import { ScrollerModule } from 'primeng/scroller';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { QuizDetailsComponent } from './quiz-details/quiz-details.component';
import { TrackuserComponent } from './trackuser/trackuser.component';
import { TrackDetailsComponent } from './track-details/track-details.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { TecheCatComponent } from './teche-cat/teche-cat.component';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { RatingModule } from 'primeng/rating';

@NgModule({
  declarations: [
    AdminComponent,
    ContentDetailsComponent,
    HeaderComponent,
    QuizComponent,
    DashboardComponent,
    SpinnerComponent,
    ContentComponent,
    ProfileComponent,
    AccountSettingsComponent,
    QuizDetailsComponent,
    TrackuserComponent,
    TrackDetailsComponent,
    EditFormComponent,
    TecheCatComponent,
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
    ScrollerModule,
    TieredMenuModule,
    RatingModule,
  ],
  providers: [ApiService],
})
export class AdminModule {}
