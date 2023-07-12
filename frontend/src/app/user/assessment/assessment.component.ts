import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AboutService } from 'src/app/services/about.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss'],
})
export class AssessmentComponent implements OnInit {
  public allCourses: string[] = [];
  public searchQuery: string = '';
  public items: string[] = [];
  userID!:number;

  Technologies: { tech: string }[] = [
    { tech: 'Angular' },
    { tech: 'DotNet' },
    { tech: 'Java' },
    { tech: 'Javascript' },
    { tech: 'MongoDB' },
    { tech: 'MySQL' },
    { tech: 'Node JS' },
    { tech: 'Postgresql' },
    { tech: 'Python' },
    { tech: 'React JS' },
  ];
  constructor(private apiService: ApiService, private route: Router, private aboutService:AboutService ) {}

  ngOnInit(): void {
    this.getAllQuizDetails();
    this.getAllCourseDetais();
    this.getLocalStoredData();
    this.getCartCourse();
  }
  public getLocalStoredData() {
    const localStoredData = JSON.parse(localStorage.getItem('user')!);
    this.userID = localStoredData.id;
  }

  public getCartCourse(): void {
    this.apiService.getUserCart(this.userID).subscribe((res) => {
      this.aboutService.userCartLength(res.length);
    });
  }

public uniqueTech :string[]=[]
  public getAllCourseDetais() {
    this.apiService.getContent().subscribe((res) => {


      res.data.forEach((item) => {

         this.allCourses.push(item.attributes?.technologies)


         this.allCourses.forEach((item)=>{
          const values = Object.values(item);
          values.forEach((obj)=>{
            if (!this.uniqueTech.includes(obj)) {
              this.uniqueTech.push(obj);
            }

          })

         })
      });



    });
  }

  public getAllQuizDetails() {
    this.apiService.getQuiz().subscribe((res) => {});
  }

  public openQuiz(course: string) {

    this.route.navigate(['/assessment/', course]);
    localStorage.setItem('CourseName', course);
  }

  onSearchDetails() {
    this.allCourses = this.items.filter((course: string) =>
      course.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
