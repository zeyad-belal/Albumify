import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from 'src/app/services/user.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
})
export class AlbumComponent {
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
