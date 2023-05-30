import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
})
export class RegComponent implements OnInit {
  students: any;

  constructor(public stService: UserService, private router: Router) {
    if (window.localStorage.getItem('hasVisited')) {
      this.router.navigate(['/login']);
    }
  }
  ngOnInit(): void {
    this.stService.getAllUsers().subscribe({
      next: (value: any) => {
        this.students = value;
      },
      error: (err: any) => {
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

  submitValues() {
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
        .subscribe(() => {
          this.stService.setVisited();
          this.stService.setLogged();
          this.router.navigate(['/users']);
        });
    }
  }
}

// ==============================================================
