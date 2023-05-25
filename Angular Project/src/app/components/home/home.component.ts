import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private myRoute:Router){}
  logout(){
    window.localStorage.setItem("loggedIn","false")
    this.myRoute.navigate(['']);
  }
}
