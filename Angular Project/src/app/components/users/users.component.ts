import { Component, OnInit ,ChangeDetectorRef  } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  users: any;
  admin:any;
  ID: any;
  stUpdated: any;


  updateClicked = false;
  addClicked = false;

  constructor(private cdr: ChangeDetectorRef ,public stService: UserService, private router: Router) {
    this.admin = window.localStorage.getItem("admin")
    

  }

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
    ){
      this.stService.addUser({
          name: this.regValid.controls['name'].value,
          email: this.regValid.controls['email'].value,
          phone: this.regValid.controls['phone'].value,
          street: this.regValid.controls['street'].value,
          city: this.regValid.controls['city'].value,
        }).subscribe();
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

  updateValues() {

console.log(this.ID)
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
      }
  }


  adding(){
    this.addClicked = true;
    this.updateClicked = false;
  }

  updating(id:any){
    this.addClicked = false;
    this.updateClicked = true;
    this.ID = id; 

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
}
