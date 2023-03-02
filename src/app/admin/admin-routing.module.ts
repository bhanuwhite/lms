import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CommunityForumComponent } from './community-forum/community-forum.component';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { ContentComponent } from './content/content.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CoursesComponent } from './courses/courses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { ProfileComponent } from './profile/profile.component';
import { QuizComponent } from './quiz/quiz.component';

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
        path: 'meetings',component: MeetingsComponent
      },
      {
        path: 'profile', component: ProfileComponent
      },
      {
        path: 'community-forum', component: CommunityForumComponent
      }
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
