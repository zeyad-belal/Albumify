import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {StudentsService} from 'src/app/services/students.service'


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent {
  ID:any;
  student:any;

  constructor(myRoute:ActivatedRoute , myService:StudentsService){
    
    this.ID = myRoute.snapshot.params["id"];

    myService.getUserById(this.ID).subscribe(
      (data)=>this.student = data,
      (err)=>console.log(err)
    )
  }
}
