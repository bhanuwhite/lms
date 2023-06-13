import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { Button, ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { HeaderComponent } from './header/header.component';
import { AccordionModule } from 'primeng/accordion';
import { TabView, TabViewModule } from 'primeng/tabview';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { UserFooterComponent } from './user-footer/user-footer.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { AvatarModule } from 'primeng/avatar';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { MenubarModule } from 'primeng/menubar';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { MessageComponent } from './message/message.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfileComponent } from './profile/profile.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { MultiSelectModule } from 'primeng/multiselect';
import { SplitterModule } from 'primeng/splitter';
import { UserContentComponent } from './user-content/user-content.component';
import { DividerModule } from 'primeng/divider';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ToastModule } from 'primeng/toast';
import { UserCommunityComponent } from './user-community/user-community.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { QuizDetailsComponent } from './quiz-details/quiz-details.component';
import { MycartComponent } from './mycart/mycart.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { BadgeModule } from 'primeng/badge';

@NgModule({
  declarations: [
    UserComponent,
    MyLibraryComponent,
    CourseDetailsComponent,
    UserHeaderComponent,
    UserFooterComponent,
    ContentDetailsComponent,
    UserCommunityComponent,
    MessageComponent,
    PurchaseHistoryComponent,
    ReceiptComponent,
    InvoiceComponent,
    PaymentComponent,
    ProfileComponent,
    UserContentComponent,
    AccountSettingsComponent,
    AssessmentComponent,
    QuizDetailsComponent,
    MycartComponent,
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
    RatingModule,
    MatTabsModule,
    AvatarModule,
    MatIconModule,
    MenuModule,
    DialogModule,
    TooltipModule,
    CardModule,
    RatingModule,
    MatTabsModule,
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
    TableModule,
    TabViewModule,
    CheckboxModule,
    FileUploadModule,
    FormsModule,
    SplitterModule,
    MultiSelectModule,
    DividerModule,
    ToastModule,
    ConfirmPopupModule,
    BadgeModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserModule {}
