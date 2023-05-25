import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {StudentsService} from 'src/app/services/students.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:any
  users:any
  emailIsWrong:any;

  constructor(private myRoute:Router ,private myService:StudentsService){
    this.myService.getAllUsers().subscribe(data=> this.users = data)
  }

  onSubmit() {
    this.users.forEach((user: { [x: string]: any; }) => {

      if(this.email == user['email']){
        this.myService.setLogged();
        this.emailIsWrong = false;
        this.myRoute.navigate(['users']);

      }else{
        this.emailIsWrong = true;
      }

    })

  }


}



