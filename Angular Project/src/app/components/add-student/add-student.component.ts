import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {StudentsService} from 'src/app/services/students.service'

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  name:any;
  email:any;
  username:any;
  city:any;
  phone:any;
  addSucc:any =false;

  constructor(public myService:StudentsService){}

  addNewStudent(name:any ,email:any ,username:any ,city:any ,phone:any){
    let newStudent = {name ,email ,username,city , phone};
    this.myService.addUser(newStudent).subscribe();
    this.name="";
    this.email="";
    this.username="";
    this.city="";
    this.phone="";
    this.addSucc =true;
}

}
