export interface Booking {
  trainBookingId: number;
  source: string;
  destination: string;
  departureTime: Date;
  arrivalTime: Date;
  trainId: number;
  userId: number;
}
