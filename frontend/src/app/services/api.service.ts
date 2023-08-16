import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {
  AllCourseContent,
  AllCourseContentData,
  postCourseContentData
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
import {
  CartGetRes,
  CartPostBody,
  CartPostRes,
  CartResponse,
} from '../models/cart';
import { environment } from 'src/environment/environment';
import { CourseData , postUserCourse , postUserCourseData} from 'src/app/models/library';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // Get COURSE CONTENT
  public getContent(): Observable<AllCourseContent> {
    return this.http.get<AllCourseContent>(
      `${environment.apiUrl}/api/course-contents?populate=*`
    );
  }

  /**
   * getSingleCourseContent
   */
  public getSingleContent(id: number): Observable<AllCourseContentData> {
    return this.http.get<AllCourseContentData>(
      `${environment.apiUrl}/api/course-contents/${id}?populate=*`
    );
  }

  // File upload api
  public uploadFile(item: {}): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/upload`, item);
  }

  // For Video Desc-
  public uploadVideoDescGet(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/upload/files/${id}`);
  }

  public uploadVideoDesc(id: number, item: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/api/upload?id=${id}`,
      item
    );
  }

  //Post COURSE CONTENT
  public postContent( item: any ): Observable<any> {
    return this.http.post<any>( `${environment.apiUrl}/api/course-contents`,item);
}

  // update COURSE CONTENT
  public updateContent(
    id: number,
    item: postCourseContentData
  ): Observable<AllCourseContentData> {
    return this.http.put<AllCourseContentData>(
      `${environment.apiUrl}/api/course-contents/${id}`,
      item
    );
  }

  // Delete COURSE CONTENT
  public deleteContent(id: number | undefined): Observable<AllCourseContent> {
    return this.http.delete<AllCourseContent>(
      `${environment.apiUrl}/api/course-contents/${id}`
    );
  }

  // Post course
  public postCourse(item: PostCourseData): Observable<TotalCoursesData> {
    return this.http.post<TotalCoursesData>(
      `${environment.apiUrl}/api/courses?populate=*`,
      item
    );
  }

  // Get courses
  public getCourses(): Observable<TotalCoursesData> {
    return this.http.get<TotalCoursesData>(
      `${environment.apiUrl}/api/courses?populate=*`
    );
  }

  // Get courses
  public getSingleCourse(id: number): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/api/courses/${id}?populate=*`
    );
  }

  // update courses
  public updateCourse(
    id: number,
    item: UpdateCourseObj
  ): Observable<TotalCoursesData> {
    return this.http.put<TotalCoursesData>(
      `${environment.apiUrl}/api/courses/${id}?populate=*`,
      item
    );
  }

  // Delete course
  public deleteCourse(id: number): Observable<TotalCoursesData> {
    return this.http.delete<TotalCoursesData>(
      `${environment.apiUrl}/api/courses/${id}?populate=*`
    );
  }

  /**
   * getQuiz
   */
  public getQuiz(): Observable<QuizData> {
    return this.http.get<QuizData>(`${environment.apiUrl}/api/assessments`);
  }

  /**
   * postQuiz
   */
  public postQuiz(item: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(`${environment.apiUrl}/api/assessments`, item);
  }

  /**
   * updateQuiz
   */
  public updateQuiz(id: number, item: Quiz): Observable<Quiz> {
    return this.http.put<Quiz>(
      `${environment.apiUrl}/api/assessments/${id}`,
      item
    );
  }

  /**
   * deleteQuiz
   */
  public deleteQuiz(id: number): Observable<Quiz> {
    return this.http.delete<Quiz>(
      `${environment.apiUrl}/api/assessments/${id}`
    );
  }

  // ------------Library API-------------

  // GET
  public getContentLibrary(): Observable<LibraryGetResponse> {
    return this.http.get<LibraryGetResponse>(
      `${environment.apiUrl}/api/users?populate=course_contents.content&populate=course_contents.placeholder_img`
    );
  }

  //POST
  public postContentLibrary(item: {
    data: { course_content: number };
  }): Observable<LibraryGetResponse> {
    return this.http.post<LibraryGetResponse>(
      `${environment.apiUrl}/api/users?populate=course_content.content&populate=course_content.placeholder_img`,
      item
    );
  }

  // PUT
  public putLibraryData(id: number, item: any): Observable<LibraryGetResponse> {
    return this.http.put<LibraryGetResponse>(
      `${environment.apiUrl}/api/users/${id}?populate=course_contents.content&populate=course_contents.placeholder_img`,
      item
    );
  }

  // DELETE.
  public removeLibraryCourse(id: number): Observable<LibraryGetResponse> {
    return this.http.delete<LibraryGetResponse>(
      `${environment.apiUrl}/api/users/${id}`
    );
  }

  /**
   * getSingleContentLibrary
   */
  public getSingleContentLibrary(
    id: number
  ): Observable<UserLibraryGetResponse> {
    return this.http.get<UserLibraryGetResponse>(
      `${environment.apiUrl}/api/user-has-courses/${id}?populate=course_content.content&populate=course_content.placeholder_img`
    );
  }

  // GET Communtiy
  public getCommunities(): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/api/communities?populate=*`
    );
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
    return this.http.get<userProfile[]>(`${environment.apiUrl}/api/users`);
  }

  // POST profile
  public updateProfileDetails(
    id: number,
    item: userUpdateProfile
  ): Observable<userProfile> {
    return this.http.put<userProfile>(
      `${environment.apiUrl}/api/users/${id}`,
      item
    );
  }

  public getProfileAvatarDetails(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/users?populate=*`);
  }

  public updateProfileAvatarDetails(id: number, item: any): Observable<any> {
    return this.http.put<any>(
      `${environment.apiUrl}/api/users?populate=*/${id}`,
      item
    );
  }



  //  --------- USER-HAS-COURSE API----------
  // GET Courses by passing UserID
  public getUserCourse(id: number): Observable<CourseData[]> {
    return this.http.get<CourseData[]>(
      `${environment.apiUrl}/api/users-course?user_id=${id}`
    );
  }


  // GET by ID
  public getUserHasCourseById(id: number): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/api/user-has-courses/${id}?populate=course_ids.content&populate=course_ids.placeholder_img`
    );
  }

  // POST
  public postUserHasCourse(item: postUserCourse): Observable<postUserCourseData> {
    return this.http.post<postUserCourseData>(
      `${environment.apiUrl}/api/user-has-courses`,
      item
    );
  }

  // PUT
  public putUserHasCourse(id: number, item: any): Observable<any> {
    return this.http.put<any>(
      `${environment.apiUrl}/api/user-has-courses/${id}`,
      item
    );
  }

  // DELETE
  public deleteUserHasCourse(id: number): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiUrl}/api/user-has-courses/${id}`
    );
  }

  //  ------- CART API  --------------
  // GET specific users
  public getUserCart(id: number): Observable<CartResponse[]> {
    return this.http.get<CartResponse[]>(
      `${environment.apiUrl}/api/users-cart?user_id=${id}`
    );
  }

  // GET
  public getCart(): Observable<CartGetRes> {
    return this.http.get<CartGetRes>(`${environment.apiUrl}/api/carts`);
  }
  // POST
  public postCart(item: CartPostBody): Observable<CartGetRes> {
    return this.http.post<CartGetRes>(`${environment.apiUrl}/api/carts`, item);
  }
  // PUT
  public putCart(id: number, item: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/api/carts/${id}`, item);
  }
  // DELETE
  public deleteCartItem(id: number): Observable<CartPostRes> {
    return this.http.delete<CartPostRes>(
      `${environment.apiUrl}/api/carts/${id}`
    );
  }

  // POST
  public postPayment(item: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/api/create/orderId`,
      item
    );
  }

  // POST
  public postPaymentVerify(item: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/api/payment/verify`,
      item
    );
  }

  // POST
  public postUserRatings(item: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/ratings`, item);
  }

  // get
  public getUserRatings(id: any): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/api/ratings?course_id=${id}`
    );
  }

  // PUT Rating
  public upadateUserRatings(id: number, item: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/api/ratings/${id}`, item);
  }


// GET ALL USER'S

public getAllUers():Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/api/users`)
}

// GET SINGLE USER PROGRESS
public getSingleUserProgress(id:number):Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/api/users-course?user_id=${id}`)
}

// Get Users by Id

public getSingleUser(id:number):Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/api/users/${id}`)
}

// GET Technology and Category
public getTechnoogy():Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/api/technologies`)
}
public postTechnoogy(item:any):Observable<any> {
  return this.http.post<any>(`${environment.apiUrl}/api/technologies`,item)
}
public putTechnoogy(id:number,item:any):Observable<any> {
  return this.http.put<any>(`${environment.apiUrl}/api/technologies/${id}`,item)
}

public deleteTechnoogy(id:number):Observable<any> {
  return this.http.delete<any>(`${environment.apiUrl}/api/technologies/${id}`)
}


public getCategory():Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/api/categories`)
}

public postCategory(item:any):Observable<any> {
  return this.http.post<any>(`${environment.apiUrl}/api/categories`,item)
}
public putCategory(id:number,item:any):Observable<any> {
  return this.http.put<any>(`${environment.apiUrl}/api/categories/${id}`,item)
}
public deleteCategory(id:number):Observable<any> {
  return this.http.delete<any>(`${environment.apiUrl}/api/categories/${id}`)
}

}
