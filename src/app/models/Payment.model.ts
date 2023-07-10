export class Payment{
  paymentId!: number ;
  paymentTime!: Date ;
  paymentMethod: string = '';
  totalPrice!: number;
  paymentStatus!: boolean;
  trainBookingId!: number
}
