import { Component, OnInit ,ChangeDetectorRef  } from '@angular/core';
import { StudentsService } from 'src/app/services/user.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  users: any;
  constructor(private cdr: ChangeDetectorRef ,public stService: StudentsService, private router: Router) {}

  ngOnInit(): void {
    this.stService.getAllUsers().subscribe({
      next: (value) => {
        this.users = value;
      },
      error: (err) => {
        console.log(err);
      },
    });
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

  addValues() {
    if (
      this.regValid.controls['name'].valid &&
      this.regValid.controls['email'].valid &&
      this.regValid.controls['phone'].valid &&
      this.regValid.controls['street'].valid &&
      this.regValid.controls['city'].valid
    ) {
      this.stService
        .addUser({
          name: this.regValid.controls['name'].value,
          email: this.regValid.controls['email'].value,
          phone: this.regValid.controls['phone'].value,
          street: this.regValid.controls['street'].value,
          city: this.regValid.controls['city'].value,
        })
        .subscribe();
    }
  }

  deleteUser(id: any) {
    this.stService.deleteUser(id).subscribe();
    this.stService.getAllUsers().subscribe({
      next: (value) => {
        this.users = value;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.cdr.detectChanges();
  }

}
