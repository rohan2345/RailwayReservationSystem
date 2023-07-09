import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from './models/booking.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseServerUrl='https://localhost:44315/';
  constructor(private httpClient: HttpClient) { }

  addBooking(addBookingRequest : Booking): Observable<any>{
    return this.httpClient.post<Booking>(this.baseServerUrl + 'Booking/Add', addBookingRequest);
  }

  cancelBooking(bookingId : number): Observable<Booking>{
    return this.httpClient.delete<Booking>(this.baseServerUrl + 'Booking/'+ bookingId);
  }

  getBookings() : Observable<Booking[]>{
    return this.httpClient.get<Booking[]>(this.baseServerUrl + 'Booking');
  }

  getBooking(bookingId : any): Observable<Booking>{
    return this.httpClient.get<Booking>(this.baseServerUrl + 'Booking/'+ bookingId);
  }
  updateBooking(bookingId : any,booking:Booking): Observable<Booking>{
    return this.httpClient.get<Booking>(this.baseServerUrl + 'Booking/'+ bookingId);
  }
}
