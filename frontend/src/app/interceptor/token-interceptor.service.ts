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
  constructor(private router: Router, private messageService: MessageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = localStorage.getItem("token");
    if (request.url !== 'api/auth/local' && request.url !== 'api/auth/local/register') {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.token}`).set("Access-Control-Allow-Origin", "*"),
      });
    }

    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.status === 401) {
          localStorage.clear();
          this.router.navigate(['login']);
          this.messageService.add({ severity: 'error', summary: 'Bad request', detail: 'Unauthorized request !!' });
        } else if (error.status === 500) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail:'Internal server error !!'});
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail:'Something went wrong !!'});
        }
        return throwError(errorMessage);
      })
    );
  }
}