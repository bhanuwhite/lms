import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  token: any;
  errorMsg!:string

  constructor(private router: Router, private messageService: MessageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = localStorage.getItem("token");

   if (request.url !== 'api/auth/local' && request.url !== 'api/auth/local/register') {
      console.log(this.token);

      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.token}`).set("Access-Control-Allow-Origin", "*"),
      });
    }



    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
      console.log(error);

        this.errorMsg = error.error.error.message;
        let errorMessage = '';
        if (error.status === 401) {
          localStorage.clear();
          this.router.navigate(['login']);
setTimeout(() => {
  this.messageService.add({ severity: 'error', summary: 'Bad request', detail: 'Unauthorized request !!' });

}, 2000);
        } else if (error.status === 500) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail:'Internal server error !!'});
        }
        else if (error.status === 400) {
          if(error.error.error.message === "Invalid identifier or password"){
          this.messageService.add({ severity: 'error', summary: 'Invalid', detail:error.error.error.message});
          }
          else if(error.error.error.message === "Email or Username are already taken"){
          this.messageService.add({ severity: 'error', summary: '', detail:error.error.error.message});
          }
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail:`${this.errorMsg}`});
        }
        return throwError(errorMessage);
      })
    );
  }
}
