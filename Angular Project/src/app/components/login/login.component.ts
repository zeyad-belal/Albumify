import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: any;
  password: any;

  users: any;
  emailIsWrong: any;

  constructor(private myRoute: Router, private myService: UserService) {
    //get users data
    this.myService.getAllUsers().subscribe((data) => (this.users = data));
    // check if it is a new user
    if (!window.localStorage.getItem('hasVisited')) {
      this.myRoute.navigate(['']);
    }
  }

  onSubmit() {

      if(this.email == "admin@gmail.com" && this.password == "admin123"){

        window.localStorage.setItem('admin', 'true');
        this.myService.setLogged();
        this.emailIsWrong = false;
        this.myRoute.navigate(['users']);
        window.localStorage.setItem('hasVisited', 'true');
        
      }else if(this.email == "user@gmail.com" && this.password == "user123"){
        
        window.localStorage.setItem('admin', 'false');
        this.myService.setLogged();
        this.emailIsWrong = false;
        this.myRoute.navigate(['users']);
        window.localStorage.setItem('hasVisited', 'true');

      }else{
        this.emailIsWrong = true;
        
      }
      

    //   this.users.forEach((user: { [x: string]: any }) => {
    //     if (this.email == user['email']) {
    //       this.myService.setLogged();
    //       this.emailIsWrong = false;
    //       this.myRoute.navigate(['users']);
    //       window.localStorage.setItem('hasVisited', 'true');
    //   } else {
    //     this.emailIsWrong = true;
    //   }
    // });

  }

  register() {

    window.localStorage.removeItem('hasVisited');
    
  }
}
