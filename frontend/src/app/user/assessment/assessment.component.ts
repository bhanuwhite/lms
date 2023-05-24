import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent implements OnInit {




  ngOnInit(): void {

    this.getAllQuizDetails();
    this.getAllCourseDetais()
  }

  constructor(private apiService :ApiService){

  }
public getAllCourseDetais(){
  this.apiService.getContent().subscribe((res)=>{
    console.log(res);

  })
}


  public getAllQuizDetails(){

    this.apiService.getQuiz().subscribe((res)=>{
      console.log(res);

    })

  }


}
