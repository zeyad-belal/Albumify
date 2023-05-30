import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private myRoute:Router){}
  logout(){
    window.localStorage.setItem("loggedIn","false")
    window.localStorage.setItem("admin","false")
    this.myRoute.navigate(['/login']);
  }
  newLog(){
    this.myRoute.navigate(['']);
    window.localStorage.removeItem("hasVisited")
    window.localStorage.setItem("loggedIn","false")
  }
}
