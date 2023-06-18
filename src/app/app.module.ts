import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { UsersComponent } from './components/users/users.component';
import { AlbumComponent } from './components/album//album.component';
import { RouterModule , Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegComponent } from './components/reg/reg.component';
import { LoginGuard } from './components/login.guard';
import { PhotosComponent } from './components/photos/photos.component';

let routes:Routes = [
  {path: '',component: RegComponent},
  {path: 'login',component: LoginComponent},
  {path:"users" , component:UsersComponent,canActivate: [LoginGuard]},
  {path:"users/:id" , component:AlbumComponent,canActivate: [LoginGuard]},
  {path:'users/:id/photos',component:PhotosComponent,canActivate: [LoginGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UsersComponent,
    AlbumComponent,
    LoginComponent,
    RegComponent,
    PhotosComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
