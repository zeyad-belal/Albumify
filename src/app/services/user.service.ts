import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private myClient:HttpClient) { }
  loggedIn:any;

  private Base_URL="http://localhost:3000/users";

  private Admin_URL="http://localhost:3000/logs";

  getAllUsers(){
    return this.myClient.get(this.Base_URL)
  }

  getLogs(){
    return this.myClient.get(this.Admin_URL)
  }

  login(Temail: any) {
    return this.myClient.get<any[]>(this.Base_URL).pipe(
      map(users => {
        for (let i = 0; i < users.length; i++) {
          if (Temail === users[i].email) {
            this.loggedIn = true;
            return true;
          }
        }
        this.loggedIn = false;
        return false;
      })
    );
  }

  getUserById(id:any){
    return this.myClient.get(`${this.Base_URL}/${id}`)
  }
  addUser(newUSer:any){
    return this.myClient.post(this.Base_URL,newUSer)
  }
  updateUser(id:any ,newUSer:any){
    return this.myClient.put(`${this.Base_URL}/${id}`,newUSer)
  }
  deleteUser(id:any){
    return this.myClient.delete(`${this.Base_URL}/${id}`)
  }


  setVisited() {
    window.localStorage.setItem('hasVisited', 'true');
  }
  setLogged(){
    window.localStorage.setItem('loggedIn', 'true');
  }
}
