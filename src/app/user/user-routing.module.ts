import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { AboutComponent } from './about/about.component';
import { MessageComponent } from './message/message.component';
import { MyLibraryComponent } from './my-library/my-library.component';
import { UserComponent } from './user.component';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { InvoiceComponent } from './invoice/invoice.component';


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
  },
  {
    path: 'library', component: MyLibraryComponent
  },
  {
    path: 'contentDetails', component: ContentDetailsComponent
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'library/:id', component: CourseDetailsComponent
  },
  {
    path: 'message',
    component: MessageComponent
  },
  {
    path: 'purchase-history', component: PurchaseHistoryComponent
  },
  {
    path: 'receipt', component: ReceiptComponent
  },
  {
    path: 'invoice', component: InvoiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
