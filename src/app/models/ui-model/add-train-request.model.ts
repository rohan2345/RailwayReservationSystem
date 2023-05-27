export interface  AddTrainRequest{
  trainId:string,
  trainName:string,
  source:string,
  destination:string,
  departureTime:string,
  arrivalTime:string,
  fare:number,
  totalSeats:number,
  availableSeats:number
}
