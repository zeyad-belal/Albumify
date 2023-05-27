import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StudentsService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private studentService: StudentsService
  ) {}

  canActivate() {
    if (window.localStorage.getItem('loggedIn') == 'true') {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
    return false;
  }
}
