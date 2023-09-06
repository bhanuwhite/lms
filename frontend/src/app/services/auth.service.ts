import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Login, LoginObjData, SignUp } from '../models/authenticate';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // login
  loginUser(login: Login): Observable<LoginObjData> {
    return this.http.post<LoginObjData>(
      `${environment.apiUrl}/api/auth/local`,
      login
    );
  }

  signupUser(signup: SignUp): Observable<LoginObjData> {
    return this.http.post<LoginObjData>(
      `${environment.apiUrl}/api/auth/local/register`,
      signup
    );
  }

  forgotPassword(item: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/api/auth/forgot-password`,
      item
    );
  }

  // Reset Password
  resetPassword(item: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/api/auth/change-password`,
      item
    );
  }
}
