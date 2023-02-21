import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { MyLibraryComponent } from './my-library/my-library.component';
import { PaymentComponent } from './payment/payment.component';
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
    path: 'courseDetails', component: CourseDetailsComponent
  },
  {
    path: 'PaymentComponent', component: PaymentComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
