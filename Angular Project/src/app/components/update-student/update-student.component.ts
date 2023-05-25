import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {StudentsService} from 'src/app/services/students.service'

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent {
  ID:any;
  student:any;
  updateSucc:any =false;

  constructor(myRoute:ActivatedRoute , public myService:StudentsService){

    this.ID = myRoute.snapshot.params["id"];

    myService.getUserById(this.ID).subscribe(
      (data)=>this.student = data,
      (err)=>console.log(err)
    )
  }

  updateStudent(name:any ,email:any ,username:any ,city:any ,phone:any){
    let newStudent = {name ,email ,username,city , phone};
    this.myService.updateUser(this.ID,newStudent).subscribe();
    this.updateSucc =true;
}
}



