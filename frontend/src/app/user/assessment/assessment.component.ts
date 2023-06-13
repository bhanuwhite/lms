import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  ngOnInit(): void {
    this.getAllQuizDetails();
    this.getAllCourseDetais();
  }

  constructor(private apiService: ApiService, private route: Router) {}

  public getAllCourseDetais() {
    this.apiService.getContent().subscribe((res) => {
      const courses = res.data;

      const uniqueTechnology = new Set<string>();

      courses.forEach((item) => {
        uniqueTechnology.add(item.attributes.technology);
      });

      this.allCourses = Array.from(uniqueTechnology);
      this.items = this.allCourses;
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
