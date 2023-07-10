import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../models/Payment.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseServerUrl='https://localhost:44315/';
  constructor(private httpClient: HttpClient) { }

  addPayment(addPaymentRequest : Payment): Observable<Payment>{
    return this.httpClient.post<Payment>(this.baseServerUrl + 'Payment/Add', addPaymentRequest);
  }

  deletePayment(paymentId : number): Observable<Payment>{
    return this.httpClient.delete<Payment>(this.baseServerUrl + 'Payment/Add'+ paymentId);
  }
}
