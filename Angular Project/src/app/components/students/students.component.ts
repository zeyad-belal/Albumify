import { Component } from '@angular/core';
import {StudentsService} from 'src/app/services/students.service'


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  users:any;
  adding=false;

  name:any;
  email:any;
  phone:any;
  street:any;
  city:any;

  constructor(public myService:StudentsService){
    this.users = [];
  }

  addPopUp(){
    this.adding = true
  }

  addTheUser(name:any ,email:any ,phone:any ,street:any ,city:any ){
    let newUser = {name ,email ,phone,street,city };
    this.myService.addUser(newUser).subscribe((data) => {
      this.users.push(data);
    });
    this.name="";
    this.email="";
    this.phone="";
    this.street="";
    this.city="";
    this.adding = false
  }

  ngOnInit(): void {
    this.myService.getAllUsers().subscribe(
      (data)=>this.users = data,
      (err)=>console.log(err)
    )
    console.log(this.users)
  }
  deleteUser(id:any){
    this.myService.deleteUser(id).subscribe()
    this.myService.getAllUsers().subscribe(
      (data)=>this.users = data,
      (err)=>console.log(err)
    )
  }
}
