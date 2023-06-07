import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AdminComponent } from './admin.component';
import { CommunityForumComponent } from './community-forum/community-forum.component';
import { CommunityQuestionsRepliesComponent } from './community-questions-replies/community-questions-replies.component';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { ContentComponent } from './content/content.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CoursesComponent } from './courses/courses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InstructorsMessagesComponent } from './instructors-messages/instructors-messages.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { ProfileComponent } from './profile/profile.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizDetailsComponent } from './quiz-details/quiz-details.component';
import { TrackuserComponent } from './trackuser/trackuser.component';
import { TrackDetailsComponent } from './track-details/track-details.component';


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
        path: 'courses', component: CoursesComponent
      },
      {
        path: 'courses/:id', component: CourseDetailsComponent
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
        path: 'community-forum', component: CommunityForumComponent
      },
      {
        path: 'replies', component: CommunityQuestionsRepliesComponent
      },
      {
        path: 'account-settings', component: AccountSettingsComponent
      },
      {
        path: 'messages', component: InstructorsMessagesComponent
      },
      {
        path: 'quiz/:course', component: QuizDetailsComponent
      },

    ]
  },






  // {
  //   path: 'assessment', component: AssessmentComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
