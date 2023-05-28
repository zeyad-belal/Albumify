import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styles: [],
})
export class UpdateUserComponent implements OnInit {
  stUpdated: any;
  ID: any;
  constructor(
    public stService: StudentsService,
    private router: Router,
    private myrouteID: ActivatedRoute
  ) {
    this.ID = myrouteID.snapshot.params['id'];
  }
  letterPattern = '^[ a-zA-Z][a-zA-Z ]*$';
  regValid = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(this.letterPattern),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.stService.getUserById(this.ID).subscribe({
      next: (value) => {
        this.stUpdated = value;
        this.regValid.setValue({
          name: this.stUpdated.name,
          email: this.stUpdated.email,
          phone: this.stUpdated.phone,
          street: this.stUpdated.street,
          city: this.stUpdated.city,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateValues() {
    if (
      this.regValid.controls['name'].valid &&
      this.regValid.controls['email'].valid &&
      this.regValid.controls['phone'].valid &&
      this.regValid.controls['street'].valid &&
      this.regValid.controls['city'].valid
    ) {
      this.stService
        .updateUser(this.ID, {
          name: this.regValid.controls['name'].value,
          email: this.regValid.controls['email'].value,
          phone: this.regValid.controls['phone'].value,
          street: this.regValid.controls['street'].value,
          city: this.regValid.controls['city'].value,
        })
        .subscribe();
      const self = this;
      setTimeout(() => {
        self.router.navigate(['/users']);
      }, 1000);
    }
  }
}
