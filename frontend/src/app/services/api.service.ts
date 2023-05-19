import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {

  AllCourseContent,
  AllCoursePostData,
  ContentLibrary,
  mediaDataObj,
  userLibrary,
} from '../models/content';
import { Quiz, QuizData } from '../models/quiz';
import {
  TotalCoursesData,
  UpdateCourseObj,
  PostCourseData,
  CoursesImgUpload,
} from '../models/Courses';
import { userProfile,userUpdateProfile } from 'src/app/models/profile';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }

  // Get COURSE CONTENT
  public getContent(): Observable<AllCourseContent> {
    return this.http.get<AllCourseContent>(`/api/course-contents?populate=*`);
  }

  /**
   * getSingleCourseContent
   */
  public getSingleContent(id: number): Observable<any> {
    return this.http.get<any>(
      `/api/course-contents/${id}?populate=*`
    );
  }

  // File upload api
  public uploadFile(item: {}): Observable<any> {
    return this.http.post<any>(`api/upload`, item);
  }

  //Post COURSE CONTENT
  public postContent(item: AllCoursePostData): Observable<AllCourseContent> {
    return this.http.post<AllCourseContent>(`api/course-contents`, item);
  }

  // update COURSE CONTENT
  public updateContent(id: number, item: AllCoursePostData): Observable<AllCourseContent> {
    return this.http.put<AllCourseContent>(`api/course-contents/${id}`, item);
  }

  // Delete COURSE CONTENT
  public deleteContent(id: number | undefined): Observable<AllCourseContent> {
    return this.http.delete<AllCourseContent>(`api/course-contents/${id}`);
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
  public getSingleCourse(id: number): Observable<any> {
    return this.http.get<any>(`api/courses/${id}?populate=*`);
  }

  // update courses
  public updateCourse(id: number, item: UpdateCourseObj): Observable<TotalCoursesData> {
    return this.http.put<TotalCoursesData>(
      `api/courses/${id}?populate=*`, item);
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
    return this.http.post<Quiz>(`/api/quizzes`, item);
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

  //Post Content Library
  public postContentLibrary(item: ContentLibrary): Observable<userLibrary> {
    return this.http.post<userLibrary>(
      `api/user-has-courses?populate=content_library.media`,
      item
    );
  }
  // Get  Content Library
  public getContentLibrary(): Observable<any> {
    return this.http.get<any>(
      `api/user-has-courses?populate=content_library.media`
    );
  }

  // Delete Library Course
  public removeLibraryCourse(id: number): Observable<any> {
    return this.http.delete<any>(`api/user-has-courses/${id}`);
  }

  /**
   * getSingleContentLibrary
   */
  public getSingleContentLibrary(id: number): Observable<any> {
    return this.http
      .get<any>(`api/user-has-courses?populate=content_library.media
    `);
  }

  // GET Communtiy
  public getCommunities(): Observable<any> {
    return this.http.get<any>(`api/communities?populate=*`);
  }

  // POST Community
  public postCommunity(item: any): Observable<any> {
    return this.http.post<any>(`api/communities`, item);
  }

  // UPDATE Community

  public updateCommunity(id: number, item: any): Observable<any> {
    return this.http.put<any>(`api/communities/${id}`, item);
  }

  // DELETE Community
  public deleteCommunity(id: number): Observable<any> {
    return this.http.delete<any>(`api/communities/${id}`);
  }

  // GET profile
  public getProfileDetails(): Observable<userProfile[]> {
    return this.http.get<userProfile[]>(`api/users`);
  }


  // POST profile
  public updateProfileDetails(id: number, item: userUpdateProfile): Observable<userProfile> {
    return this.http.put<userProfile>(`api/users/${id}`, item);
  }

  public getProfileAvatarDetails(): Observable<any> {
    return this.http.get<any>(`api/users?populate=*`);
  }

  public updateProfileAvatarDetails(id: number, item: any): Observable<any> {
    return this.http.put<any>(`api/users?populate=*/${id}`, item);
  }

}


