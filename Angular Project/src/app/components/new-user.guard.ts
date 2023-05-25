import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// import { Observable } from 'rxjs';
import { StudentsService } from '../services/students.service';

@Injectable({
  providedIn: 'root'
})
export class NewUserGuard implements CanActivate {
  constructor(private router: Router, private StudentsService: StudentsService) {}

  canActivate() {
    if (window.localStorage.getItem('hasVisited')) {
      this.router.navigate(['/login']);
      return false
    } else {
      return true;
    }
  }

}
