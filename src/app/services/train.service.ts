import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Train } from 'src/app/models/ui-model/train.model';
import { AddTrainRequest } from '../models/ui-model/add-train-request.model';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
  private baseServerUrl='https://localhost:44315/';
  constructor(private http: HttpClient) {}

  getTrains(): Observable<Train[]> {
    return this.http.get<Train[]>(this.baseServerUrl+'Train/Trains');
  }
  getTrain(trainId:string): Observable<Train>{
    return this.http.get<Train>(this.baseServerUrl+'Train/GetTrainbyid/'+ trainId)
  }

  updateTrain(trainId:string,trainRequest:Train):Observable<Train>{
    const updateTrainRequest:Train={
      trainName: trainRequest.trainName,
      source: trainRequest.source,
      destination: trainRequest.destination,
      departureTime: trainRequest.departureTime,
      arrivalTime: trainRequest.arrivalTime,
      fare: trainRequest.fare,
      totalSeats: trainRequest.totalSeats,
      availableSeats: trainRequest.availableSeats,
      trainId: trainRequest.trainId
    }
      return this.http.put<Train>(this.baseServerUrl+ 'Train/UpdateTrain/' + trainId,updateTrainRequest);
     //  https://localhost:44315/ https://localhost:44315/Train/UpdateTrain/1007

   }
   deleteTrain(trainId:string):Observable<Train>{
      return this.http.delete<Train>(this.baseServerUrl+ 'Train/DeleteTrain/' + trainId);
   }

   addTrain(trainRequest:Train):Observable<Train>{

    const addTrainRequest:AddTrainRequest={
      trainName: trainRequest.trainName,
      source: trainRequest.source,
      destination: trainRequest.destination,
      departureTime: trainRequest.departureTime,
      arrivalTime: trainRequest.arrivalTime,
      fare: trainRequest.fare,
      totalSeats: trainRequest.totalSeats,
      availableSeats: trainRequest.availableSeats,
      trainId: '0'
    }

    return this.http.post<Train>(this.baseServerUrl+ 'Train/Add' ,addTrainRequest);

   }
}
