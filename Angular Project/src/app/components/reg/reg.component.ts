import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {StudentsService} from 'src/app/services/students.service'

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent {
  name="";
  email="";
  phone="";
  street="";
  city="";

  constructor(private myRoute:Router ,private myService:StudentsService){
    if(window.localStorage.getItem('hasVisited')){
      this.myRoute.navigate(['/login']);
    }
  }

  onSubmit(name:any,email:any,phone:any,street:any,city:any) {

    const regForm = {name,email,phone,street,city}

    this.myService.addUser(regForm).subscribe(() => {
      this.myService.setVisited();
      this.myService.setLogged();
      this.myRoute.navigate(['/users']);
    });
  }

}
