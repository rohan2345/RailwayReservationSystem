
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAdmin: boolean = false;
  private isLoggedIn = false;
  users: any[] | undefined;

  constructor(private http: HttpClient) { }

  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  jwtHelperService = new JwtHelperService();

  baseServerUrl = 'https://localhost:44315/api/';

  registerUser(user: Array<string>) {
    return this.http.post(this.baseServerUrl + "User/CreateUser", {
      FirstName: user[0],
      LastName: user[1],
      Email: user[2],
      Mobile: user[3],
      Gender: user[4],
      Pwd: user[5]
    }, {
      responseType: 'text',
    });
  }

  loginUser(loginInfo: Array<string>) {
    return this.http.post(this.baseServerUrl + "User/LoginUser", {
      Email: loginInfo[0],
      Pwd: loginInfo[1]
    }, {
      responseType: 'text',
    });
  }

  setToken(token: string) {
    localStorage.setItem("access_token", token);
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const token = localStorage.getItem("access_token");
    const userInfo = token != null ? this.jwtHelperService.decodeToken(token) : null;
    const data = userInfo ? {
      id: userInfo.id,
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      email: userInfo.email,
      mobile: userInfo.mobile,
      gender: userInfo.gender,
      role: userInfo.role
    } : null;
    this.currentUser.next(data);
    this.isAdmin = userInfo && userInfo.role === 'admin';
  }


  isLoggedin(): boolean {
    return localStorage.getItem("access_token") ? true : false;
  }

  removeToken() {
    localStorage.removeItem("access_token");
  }

  getUsers() {
    this.http.get<any[]>('/api/getAllUserDetails').subscribe(users => {
      this.users = users;
      console.log(users);
    });
  }

  getUserName(): string {
    const currentUser = this.currentUser.getValue();
    return currentUser ? `${currentUser.firstname} ${currentUser.lastname}` : '';
  }
  getUserInfo(): Observable<any> {
    return this.http.get<any>(this.baseServerUrl + "User/GetUserInfo");
  }
}
