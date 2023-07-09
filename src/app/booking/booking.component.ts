import { Component, OnInit } from '@angular/core';
import { Passenger } from '../models/passenger.model';
import { FormBuilder, Validators } from '@angular/forms';
import { BookingService } from '../booking.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { PassengerService } from '../services/passenger.service';
import { DataService } from '../data.service';
// import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit{

  isTaxChartCollapsed: boolean = true;
  passengers: Passenger[] = []

  seatselectionOption: boolean = false;
  passengerAddOption: boolean = false;
  currentseat: string = '';
  searchedflight :any;
  bookedtrain:any;
  amount: number = 0;
  gst!: number;
  tax!: number;
  totalAmount!: number;
  totalTax!: number;

  constructor(private authService: AuthService,
    private builder: FormBuilder,
     private router: Router,
    private bookingService: BookingService,
    private dataService: DataService,
    private passengerService: PassengerService
    // private toast:NgToastService
    ){
      this.dataService.Data$.subscribe((res) => {
        this.bookedtrain = res;
        debugger
        console.log(res);
      });
    }

    ngOnInit(): void {}
    // add passenger form
    AddPassengerForm = this.builder.group({
      firstName: this.builder.control('', Validators.required),
      lastName: this.builder.control('', Validators.required),
      age: this.builder.control('',Validators.required),
      gender: this.builder.control('',Validators.required),
      phoneNumber: this.builder.control('',Validators.required),
      userId: 0,
      bookingId: 0
    });



     // convert id to number

  convertToNumberfromstring(value: string | null): number | null
  {
    if (value === null) {
      return null;
    }

    const parsedValue = parseInt(value, 10);

    if (isNaN(parsedValue)) {
      return null;
    }

    return parsedValue;
  }

  // cancel booking

  CancelBooking()
  {
    debugger
    let bookingId : number | null = this.convertToNumberfromstring(sessionStorage.getItem('bookingId'))

    if(bookingId !== null){

      this.bookingService.cancelBooking(bookingId).subscribe((res) => {
        console.log(res);
        // this.toast.success({detail:"Booking Canceled", duration: 5000});
        this.router.navigate(['home']);
      });

    }else{

    }
  }

  //add passenger
  AddPassenger()
  {
    let bId = this.convertToNumberfromstring(sessionStorage.getItem('bookingId'))
    let uId = this.convertToNumberfromstring(sessionStorage.getItem('userId'))
    if(bId!==null && uId!==null){


   if(this.AddPassengerForm.valid){
    const passenger: Passenger = {
      passengerId: 0,
      firstName: this.AddPassengerForm.value.firstName ?? '',
        lastName:  this.AddPassengerForm.value.lastName ?? '',
        age: this.AddPassengerForm.value.age ? parseInt(this.AddPassengerForm.value.age) : 0,
        gender: this.AddPassengerForm.value.gender ?? '',
        phoneNumber: this.AddPassengerForm.value.phoneNumber ?? '',
        userId: uId,
        trainBookingId:bId

    };

    this.passengerService.addPassenger(passenger).subscribe((res: any) => {

      this.passengers.push (res);
      console.log(res);
      console.log(this.passengers)
    })
  }else{

    // this.toast.error({detail:"All blanks required!", duration: 5000});
    alert("All Field required")
  }
    }
    this.calculateAmountOnAdd();
  }


   //cancel passenger

   cancelPassenger(passengerId:number)
   {

     console.log("passenger Id :"+passengerId);

     this.passengerService.deletePassenger(passengerId).subscribe((res:any) => {

       console.log(res)
       if(res)
       {

        this.passengers = this.passengers.filter(
          (passenger) => passenger.passengerId !== passengerId
        );
        //  this.toast.success({detail:"Passenger Deleted", duration: 5000})
        alert("Passenger Deleted")}
       else{
        //  this.toast.warning({detail:"Error", duration: 5000});
        alert(" Error")
       }
     })
     this.calculateAmountOnremove();
   }


   //get passenger by id
   getPassengers() {
    debugger
    let id: number | null = this.convertToNumberfromstring(sessionStorage.getItem('bookingid') );
    if(id!==null){
    this.passengerService.getPassenger(id).subscribe((res: any) => {
      if (res) {
        debugger
        this.passengers = res;
      } else {
        // this.toast.warning(res.message);
        alert("Error")
      }
    });
    this.calculateAmount();
  }
}

  //add passenger opiton
  addPassengerOption(seat: string) {
    debugger
    this.currentseat = seat;
    this.passengerAddOption = !this.passengerAddOption;
  }

  //for button
  getButtonStyle(seat: string) {
    debugger
    if (seat === this.currentseat) {
      return { 'background-color': 'green', 'color': '#fff' };
    } else {
      return {};
    }
  }


  payments() {
    this.router.navigate(['payment', this.totalAmount]);
  }

  calculateAmount() {
    for (let i = 0; i < this.passengers.length; i++) {
      this.amount += this.bookedtrain[0].fare;
    }
    this.TotalAmount();
  }

  calculateAmountOnAdd() {
    this.amount += this.bookedtrain[0].fare;
    this.TotalAmount();

  }
  calculateAmountOnremove() {
    this.amount -= this.bookedtrain[0].fare;
    this.TotalAmount();

  }
  TotalAmount(){
    this.gst = (this.amount*18)/100;
    this.tax = (this.amount*10)/100;
    this.totalTax = this.gst+ this.tax

    this.totalAmount = this.totalTax+ this.amount
  }
}

