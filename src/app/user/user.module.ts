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
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { HeaderComponent } from './header/header.component';
import { AccordionModule } from 'primeng/accordion';
import { TabView, TabViewModule } from 'primeng/tabview';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { VideoPopupComponent } from './video-popup/video-popup.component';
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
import { AboutComponent } from './about/about.component';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { MessageComponent } from './message/message.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { InvoiceComponent } from './invoice/invoice.component';

// import {DialogModule} from 'primeng/dialog';

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
    MessageComponent,
    VideoPopupComponent,
    PurchaseHistoryComponent,
    ReceiptComponent,
    InvoiceComponent
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
    TableModule,
    TabViewModule

  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class UserModule { }