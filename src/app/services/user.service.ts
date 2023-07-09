import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UpdateUserRequest } from '../models/update-user.request.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseServerUrl='https://localhost:44315/api/';

  constructor(private httpClient:HttpClient) { }

  getUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(this.baseServerUrl+'user');
  }
  getUser(userId:string): Observable<User>{
    return this.httpClient.get<User>(this.baseServerUrl+'user/user/'+userId)
  }
  updateUser(userId:string,userRequest:User):Observable<User>{
   const updateUserRequest:UpdateUserRequest={
     firstName: userRequest.firstName,
     lastName: userRequest.lastName,
     email: userRequest.email,
     mobile: userRequest.mobile,
     gender: userRequest.gender,
     pwd: userRequest.pwd,
     userId: ''
   }
     return this.httpClient.put<User>(this.baseServerUrl+ 'User/' +userId,updateUserRequest);
  }
  deleteUser(userId:string):Observable<User>{
     return this.httpClient.delete<User>(this.baseServerUrl+ 'User/' +userId);
  }
}
