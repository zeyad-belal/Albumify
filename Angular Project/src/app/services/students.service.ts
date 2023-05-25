import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private myClient:HttpClient) { }

  private Base_URL="http://localhost:3000/users";

  getAllUsers(){
    return this.myClient.get(this.Base_URL)
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
}
