import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { StudentsComponent } from './components/students/students.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { UpdateStudentComponent } from './components/update-student/update-student.component';
import { RouterModule , Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegComponent } from './components/reg/reg.component';
import { LoginGuard } from './components/login.guard';

let routes:Routes = [
  {path: '',component: RegComponent},
  {path: 'login',component: LoginComponent},
  {path:"users" , component:StudentsComponent,canActivate: [LoginGuard]},
  {path:"users/:id" , component:StudentDetailsComponent,canActivate: [LoginGuard]},
  {path:"users/update/:id" , component:UpdateStudentComponent,canActivate: [LoginGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentsComponent,
    StudentDetailsComponent,
    UpdateStudentComponent,
    LoginComponent,
    RegComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
