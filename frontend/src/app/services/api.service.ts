import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Content,ContentData, ContentResponse,SingleContentData } from '../models/content';
import { Quiz, QuizData } from '../models/quiz';
import { TotalCoursesData,UpdateCourseObj,PostCourseData, CoursesImgUpload } from '../models/Courses';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  // Get content
  public getContent(): Observable<ContentData> {
    return this.http.get<ContentData>(`/api/content-libraries?populate=*`);
  }

  /**
   * getSingleContent
  */
  public getSingleContent(id: number): Observable<SingleContentData> {
    return this.http.get<SingleContentData>(`/api/content-libraries/${id}?populate=*`);
  }

  // File upload api
  public uploadFile(item: {}): Observable<CoursesImgUpload[]> {
    return this.http.post<CoursesImgUpload[]>(`api/upload`, item);
  }

  //Post content
  public postContent(item: Content): Observable<Content> {
    return this.http.post<Content>(`api/content-libraries`, item);
  }

  // update content
  public updateContent(id: number, item: {}): Observable<Content> {
    return this.http.put<Content>(`api/content-libraries/${id}`, item);
  }

  // Delete content
  public deleteContent(id: number | undefined): Observable<ContentResponse> {
    return this.http.delete<ContentResponse>(`api/content-libraries/${id}`);
  }

  // Post course
  public postCourse(item: PostCourseData): Observable<TotalCoursesData> {
    return this.http.post<TotalCoursesData>(`api/courses?populate=*`, item);
  }

  // Get courses
  public getCourses(): Observable<TotalCoursesData> {
    return this.http.get<TotalCoursesData>(`api/courses?populate=*`);
  }

  // Get courses
  public getSingleCourse(id:number): Observable<any> {
    return this.http.get<any>(`api/courses/${id}?populate=*`);
  }

  // update courses
  public updateCourse(id: number, item: UpdateCourseObj): Observable<TotalCoursesData> {
    return this.http.put<TotalCoursesData>(`api/courses/${id}?populate=*`, item);
  }

  // Delete course
  public deleteCourse(id: number): Observable<TotalCoursesData> {
    return this.http.delete<TotalCoursesData>(`api/courses/${id}?populate=*`);
  }

  /**
   * getQuiz
   */
  public getQuiz(): Observable<QuizData> {
    return this.http.get<QuizData>(`api/quizzes`);
  }

  /**
   * postQuiz
   */
  public postQuiz(item: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(`/api/quizzes`, item)
  }

  /**
   * updateQuiz
   */
  public updateQuiz(id: number, item: Quiz): Observable<Quiz> {
    return this.http.put<Quiz>(`/api/quizzes/${id}`, item);
  }

  /**
   * deleteQuiz
   */
  public deleteQuiz(id: number): Observable<Quiz> {
    return this.http.delete<Quiz>(`/api/quizzes/${id}`);
  }


}
