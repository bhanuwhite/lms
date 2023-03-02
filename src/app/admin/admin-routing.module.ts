import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CommunityComponent } from './community/community.component';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { ContentComponent } from './content/content.component';
import { CoursesComponent } from './courses/courses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionRepliesComponent } from './question-replies/question-replies.component';
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
        path: 'quiz', component: QuizComponent
      },
      {
        path: 'community', component: CommunityComponent
      },
      {
        path: 'replies', component: QuestionRepliesComponent
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
