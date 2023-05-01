import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Login , LoginObjData,SignUp} from '../models/authenticate';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // url = "https://c628-117-234-39-140.in.ngrok.io";

  constructor(
    private http:HttpClient
  ) { }


  // login
  loginUser(login: Login): Observable<LoginObjData> {
    return this.http.post<LoginObjData>(`api/auth/local`, login);
  }

  signupUser(signup:SignUp) : Observable<LoginObjData> {
    return this.http.post<LoginObjData>(`api/auth/local/register`, signup);
  }

}
