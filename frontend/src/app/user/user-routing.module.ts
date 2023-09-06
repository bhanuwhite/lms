import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { MessageComponent } from './message/message.component';
import { MyLibraryComponent } from './my-library/my-library.component';
import { UserComponent } from './user.component';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfileComponent } from './profile/profile.component';
import { UserContentComponent } from './user-content/user-content.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { QuizDetailsComponent } from './quiz-details/quiz-details.component';
import { MycartComponent } from './mycart/mycart.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        component: UserContentComponent,
      },
      {
        path: 'library',
        component: MyLibraryComponent,
      },
      {
        path: 'assessment',
        component: AssessmentComponent,
      },
      {
        path: 'assessment/:course',
        component: QuizDetailsComponent,
      },
      {
        path: 'course/:id',
        component: ContentDetailsComponent,
      },
      {
        path: 'library/:id',
        component: CourseDetailsComponent,
      },
      {
        path: 'message',
        component: MessageComponent,
      },
      {
        path: 'payment',
        component: PaymentComponent,
      },
      {
        path: 'purchase-history',
        component: PurchaseHistoryComponent,
      },
      {
        path: 'receipt',
        component: ReceiptComponent,
      },
      {
        path: 'invoice',
        component: InvoiceComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
      },
      {
        path: 'mycart',
        component: MycartComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
