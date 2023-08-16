import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AdminComponent } from './admin.component';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { ContentComponent } from './content/content.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizDetailsComponent } from './quiz-details/quiz-details.component';
import { TrackuserComponent } from './trackuser/trackuser.component';
import { TrackDetailsComponent } from './track-details/track-details.component';
import { TecheCatComponent } from './teche-cat/teche-cat.component';


const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      {
        path: '', component: DashboardComponent
      },
      {
        path: 'content', component: ContentComponent
      },
      {
        path: 'content/:id', component: ContentDetailsComponent
      },
      {
        path: 'quiz', component: QuizComponent
      },
      {
        path: 'trackuser',component: TrackuserComponent
      },
      {
        path:'trackuser/:id',component: TrackDetailsComponent
      },
      {
        path: 'profile', component: ProfileComponent
      },
      {
        path: 'account-settings', component: AccountSettingsComponent
      },
      {
        path: 'quiz/:course', component: QuizDetailsComponent
      },
      {
        path:'technology/:technology',
        component: TecheCatComponent
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
