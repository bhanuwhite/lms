import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {
  AllCourseContent,
  AllCourseContentData,
  postCourseContentData,
} from '../models/content';
import { Quiz, QuizData } from '../models/quiz';
import {
  TotalCoursesData,
  UpdateCourseObj,
  PostCourseData,
} from '../models/Courses';
import { userProfile, userUpdateProfile } from 'src/app/models/profile';
import {
  LibraryGetResponse,
  UserLibraryGetResponse,
} from '../models/user-library';
import { TrackPost, TrackPut, TrackResponse } from '../models/track';
import {
  CartGetRes,
  CartPostBody,
  CartPostRes,
  CartResponse,
} from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // Get COURSE CONTENT
  public getContent(): Observable<AllCourseContent> {
    return this.http.get<AllCourseContent>(`/api/course-contents?populate=*`);
  }

  /**
   * getSingleCourseContent
   */
  public getSingleContent(id: number): Observable<AllCourseContentData> {
    return this.http.get<AllCourseContentData>(
      `/api/course-contents/${id}?populate=*`
    );
  }

  // File upload api
  public uploadFile(item: {}): Observable<any> {
    return this.http.post<any>(`api/upload`, item);
  }

  // single video
  // api/upload/files/1056

  // For Video Desc-
  public uploadVideoDescGet(id: number): Observable<any> {
    return this.http.get<any>(`api/upload/files/${id}`);
  }

  public uploadVideoDesc(id: number, item: any): Observable<any> {
    return this.http.post<any>(`/api/upload?id=${id}`, item);
  }

  //Post COURSE CONTENT
  public postContent( item: postCourseContentData): Observable<AllCourseContentData> {
    return this.http.post<AllCourseContentData>(`api/course-contents`, item);
  }

  // update COURSE CONTENT
  public updateContent(id: number, item: postCourseContentData ): Observable<AllCourseContentData> {
    return this.http.put<AllCourseContentData>(`api/course-contents/${id}`,item );
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
  public updateCourse(
    id: number,
    item: UpdateCourseObj
  ): Observable<TotalCoursesData> {
    return this.http.put<TotalCoursesData>(
      `api/courses/${id}?populate=*`,
      item
    );
  }

  // Delete course
  public deleteCourse(id: number): Observable<TotalCoursesData> {
    return this.http.delete<TotalCoursesData>(`api/courses/${id}?populate=*`);
  }

  /**
   * getQuiz
   */
  public getQuiz(): Observable<QuizData> {
    return this.http.get<QuizData>(`/api/assessments`);
  }

  /**
   * postQuiz
   */
  public postQuiz(item: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(`/api/assessments`, item);
  }

  /**
   * updateQuiz
   */
  public updateQuiz(id: number, item: Quiz): Observable<Quiz> {
    return this.http.put<Quiz>(`/api/assessments/${id}`, item);
  }

  /**
   * deleteQuiz
   */
  public deleteQuiz(id: number): Observable<Quiz> {
    return this.http.delete<Quiz>(`/api/assessments/${id}`);
  }

  // ------------Library API-------------

  // GET
  public getContentLibrary(): Observable<LibraryGetResponse> {
    return this.http.get<LibraryGetResponse>(
      `/api/users?populate=course_contents.content&populate=course_contents.placeholder_img`
    );
  }

  //POST
  public postContentLibrary(item: {
    data: { course_content: number };
  }): Observable<LibraryGetResponse> {
    return this.http.post<LibraryGetResponse>(
      `/api/users?populate=course_content.content&populate=course_content.placeholder_img`,
      item
    );
  }

  // PUT
  public putLibraryData(id: number, item: any): Observable<LibraryGetResponse> {
    return this.http.put<LibraryGetResponse>(
      `/api/users/${id}?populate=course_contents.content&populate=course_contents.placeholder_img`,
      item
    );
  }

  // DELETE.
  public removeLibraryCourse(id: number): Observable<LibraryGetResponse> {
    return this.http.delete<LibraryGetResponse>(`api/users/${id}`);
  }

  /**
   * getSingleContentLibrary
   */
  public getSingleContentLibrary(
    id: number
  ): Observable<UserLibraryGetResponse> {
    return this.http.get<UserLibraryGetResponse>(
      `api/user-has-courses/${id}?populate=course_content.content&populate=course_content.placeholder_img`
    );
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
  public updateProfileDetails(
    id: number,
    item: userUpdateProfile
  ): Observable<userProfile> {
    return this.http.put<userProfile>(`api/users/${id}`, item);
  }

  public getProfileAvatarDetails(): Observable<any> {
    return this.http.get<any>(`api/users?populate=*`);
  }

  public updateProfileAvatarDetails(id: number, item: any): Observable<any> {
    return this.http.put<any>(`api/users?populate=*/${id}`, item);
  }

  // -------- TRACK API --------------------

  // GET
  public getTrack(): Observable<TrackResponse> {
    return this.http.get<TrackResponse>(`api/tracks`);
  }

  // GT by id
  public getTrackbyId(id: number): Observable<any> {
    return this.http.get<any>(`api/tracks/${id}`);
  }

  // POST
  public postTrack(item: TrackPost): Observable<TrackResponse> {
    return this.http.post<TrackResponse>(`api/tracks`, item);
  }

  // PUT
  public putTrack(id: number, item: TrackPut): Observable<TrackResponse> {
    return this.http.put<TrackResponse>(`api/tracks/${id}`, item);
  }

  // DELETE
  public deleteTrack(id: number): Observable<TrackResponse> {
    return this.http.delete<TrackResponse>(`api/tracks/${id}`);
  }

  //  --------- USER-HAS-COURSE API----------
  // GET Courses by passing UserID
  public getUserCourse(id: number): Observable<any> {
    return this.http.get<any>(`api/users-course?user_id=${id}`);
  }

  //  public getUserHasCourse(): Observable<any> {
  //     return this.http.get<any>(`api/user-has-courses?populate=course_ids.content&populate=course_ids.placeholder_img`);
  //   }
  // GET by ID
  public getUserHasCourseById(id: number): Observable<any> {
    return this.http.get<any>(
      `api/user-has-courses/${id}?populate=course_ids.content&populate=course_ids.placeholder_img`
    );
  }

  // POST
  public postUserHasCourse(item: any): Observable<any> {
    return this.http.post<any>(`api/user-has-courses`, item);
  }

  // PUT
  public putUserHasCourse(id: number, item: any): Observable<any> {
    return this.http.put<any>(`api/user-has-courses/${id}`, item);
  }

  // DELETE
  public deleteUserHasCourse(id: number): Observable<any> {
    return this.http.delete<any>(`api/user-has-courses/${id}`);
  }

  //  ------- CART API  --------------
  // GET specific users
  public getUserCart(id: number): Observable<CartResponse[]> {
    return this.http.get<CartResponse[]>(`api/users-cart?user_id=${id}`);
  }

  // GET
  public getCart(): Observable<CartGetRes> {
    return this.http.get<CartGetRes>(`api/carts`);
  }
  // POST
  public postCart(item: CartPostBody): Observable<CartGetRes> {
    return this.http.post<CartGetRes>(`api/carts`, item);
  }
  // PUT
  public putCart(id: number, item: any): Observable<any> {
    return this.http.put<any>(`api/carts/${id}`, item);
  }
  // DELETE
  public deleteCartItem(id: number): Observable<CartPostRes> {
    return this.http.delete<CartPostRes>(`api/carts/${id}`);
  }

  // POST
  public postPayment(item: any): Observable<any> {
    return this.http.post<any>(`api/create/orderId`, item);
  }

  // POST
  public postPaymentVerify(item: any): Observable<any> {
    return this.http.post<any>(`api/payment/verify`, item);
  }

   // POST
   public postUserRatings(item: any): Observable<any> {
    return this.http.post<any>(`api/ratings`, item);
  }

   // get
   public getUserRatings(id:any): Observable<any> {
    return this.http.get<any>(`api/ratings?course_id=${id}`);
  }

   // PUT Rating
   public upadateUserRatings(id: number, item: any): Observable<any> {
    return this.http.put<any>(`api/ratings/${id}`,item);
  }

}
