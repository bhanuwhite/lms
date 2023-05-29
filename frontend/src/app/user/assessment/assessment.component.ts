import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent implements OnInit {

public allCourses:any;
public searchQuery:string='';
public items:any;
  ngOnInit(): void {

    this.getAllQuizDetails();
    this.getAllCourseDetais()
  }

  constructor(private apiService :ApiService,private route :Router){

  }
public getAllCourseDetais(){
  this.apiService.getContent().subscribe((res)=>{
    this.allCourses= res.data;
    this.items = res.data;
  console.log(res.data);
  })
}


  public getAllQuizDetails(){
    this.apiService.getQuiz().subscribe((res)=>{
    })
  }

  public openQuiz(course:any){
    console.log("hello");
    this.route.navigate(['/assessment/', course])
    localStorage.setItem('CourseName', course)
  }

  onSearchDetails(){
    this.allCourses = this.items.filter((course:any) => course.attributes.name.toLowerCase().includes(this.searchQuery.toLowerCase()));

  }


}
