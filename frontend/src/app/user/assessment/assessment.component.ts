import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent implements OnInit {

public allCourses:any;


  ngOnInit(): void {

    this.getAllQuizDetails();
    this.getAllCourseDetais()
  }

  constructor(private apiService :ApiService){

  }
public getAllCourseDetais(){
  this.apiService.getContent().subscribe((res)=>{
    this.allCourses= res.data;
  console.log(res.data);
  })
}


  public getAllQuizDetails(){

    this.apiService.getQuiz().subscribe((res)=>{
    })
  }
  public openQuiz(){
    console.log("hello");

  }


}
