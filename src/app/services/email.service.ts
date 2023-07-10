import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private baseServerUrl='https://localhost:44315/';
  constructor(private httpClient: HttpClient) { }

  sendEmail(email:any){
    return this.httpClient.post<any>(this.baseServerUrl + 'Email',email);
  }
}
