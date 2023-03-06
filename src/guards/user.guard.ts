import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private router: Router) { }
  canActivate(): boolean {

    const role = localStorage.getItem('role');
    const isAuthenticate = localStorage.getItem('isAuthenticate');
    if (role == "user" && isAuthenticate == 'true') {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
  
}
