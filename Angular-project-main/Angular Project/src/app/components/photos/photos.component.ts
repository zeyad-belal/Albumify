import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from 'src/app/services/user.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html'
})
export class PhotosComponent {
  ID: any;
  student: any;

  constructor(myRoute: ActivatedRoute, myService: StudentsService) {
    this.ID = myRoute.snapshot.params['id'];

    myService.getUserById(this.ID).subscribe(
      (data) => (this.student = data),
      (err) => console.log(err)
    );
  }

}
