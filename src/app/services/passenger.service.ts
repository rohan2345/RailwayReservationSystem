import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Passenger } from '../models/passenger.model';
import { AddPassengerRequest } from '../models/ui-model/add-passenger.model';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  private baseServerUrl='https://localhost:44315/';
  constructor(private http: HttpClient) {}

  getPassengers(): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(this.baseServerUrl+'Passenger');
  }
  getPassenger(passengerId:number): Observable<Passenger>{
    return this.http.get<Passenger>(this.baseServerUrl+'Passenger/'+ passengerId)
  }
   deletePassenger(passengerId:number){
      return this.http.delete(this.baseServerUrl+ 'Passenger/' + passengerId);
   }


   addPassenger(passenger: Passenger) : Observable<Passenger>{
    return this.http.post<Passenger>(this.baseServerUrl+ 'Passenger' ,passenger)
  }

}

