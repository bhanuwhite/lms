import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.scss']
})
export class QuizDetailsComponent implements OnInit {


public courseName:string ='';
 public quizBeginerDetails:any[]=[];
 public quizintermidiateDetails :any[]=[];
 public quizAdvancedDetails :any[]=[];

 ngOnInit(): void {
  this.courseName = localStorage.getItem('CourseName')!
  this.getQuizDetails();
}

constructor(private apiService:ApiService){}

public getQuizDetails(){

  this.apiService.getQuiz().subscribe((res:any)=>{
 console.log(res.data);


res.data.filter((result:any)=>{
  // console.log(result.attributes.course_name);

if(result.attributes.course_name == this.courseName){
  // this.quizDetails.push(result) ;
  // console.log(this.quizDetails);
  if(result.attributes.level == 'beginner'){
    this.quizBeginerDetails.push(result) ;
  }
  else if(result.attributes.level == 'intermediate'){
     this.quizintermidiateDetails.push(result)
  }
  else if(result.attributes.level == 'advanced'){
    this.quizAdvancedDetails.push(result)
 }
}
})

  })
}
}
