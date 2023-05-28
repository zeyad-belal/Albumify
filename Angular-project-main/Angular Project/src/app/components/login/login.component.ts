import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: any;
  users: any;
  emailIsWrong: any;

  constructor(private myRoute: Router, private myService: StudentsService) {
    this.myService.getAllUsers().subscribe((data) => (this.users = data));
    if (!window.localStorage.getItem('hasVisited')) {
      this.myRoute.navigate(['']);
    }
  }

  onSubmit() {
    this.users.forEach((user: { [x: string]: any }) => {
      if (this.email == user['email']) {
        this.myService.setLogged();
        this.emailIsWrong = false;
        this.myRoute.navigate(['users']);
        window.localStorage.setItem('hasVisited', 'true');
      } else {
        this.emailIsWrong = true;
      }
    });
  }

  register() {

    window.localStorage.removeItem('hasVisited');
    
  }
}
