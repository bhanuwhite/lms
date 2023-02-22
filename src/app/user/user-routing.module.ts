import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { MyLibraryComponent } from './my-library/my-library.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { UserComponent } from './user.component';


const routes: Routes = [
  {
    path: '',
    component: UserComponent,

  },
  {
    path: 'library', component: MyLibraryComponent
  },
  {
    path: 'library/:id', component: CourseDetailsComponent
  },
  {
    path: 'purchaseHistory', component: PurchaseComponent
  },
  {
    path: 'receipt', component: ReceiptComponent
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
