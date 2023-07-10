import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TrainService } from 'src/app/services/train.service';
import { Train } from 'src/app/models/ui-model/train.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingService } from 'src/app/booking.service';
import { DataService } from 'src/app/data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  trains: Train[] = [] ;
  formData: any;
  train!: Train;
  AddBookingForm!: FormGroup

  displayTrains: any = { source: '', destination: ''};

  isSearched = false;
  filteredTrains: Train[] | undefined;

  trainForm=new FormGroup({
    source:new FormControl("",[Validators.required]),
    destination : new  FormControl("",[Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private trainService: TrainService,
    private builder: FormBuilder,
    private bookingService:BookingService,
    private dataService: DataService
  ) {}

  logOut() {
    this.authService.removeToken();
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    this.trainService.getTrains().subscribe(
      (successResponse: Train[]) => {
        this.trains = successResponse;
        this.dataService.setData(successResponse);
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }

  onSearch() {
    this.isSearched = true;
    if (
      this.displayTrains &&
      this.displayTrains.source &&
      this.displayTrains.destination
    ) {
      this.filteredTrains = this.trains.filter((train) =>
        train.source.toLowerCase().includes(this.displayTrains.source.toLowerCase()) ||
        train.destination.toLowerCase().includes(this.displayTrains.destination.toLowerCase())
      );
    } else {
      this.filteredTrains = undefined;
    }
  }
  get Source():FormControl{
    return this.trainForm.get('source') as FormControl;
  }
  get Destination():FormControl{
    return this.trainForm.get('destination') as FormControl;
  }
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


  booking(train : Train){
   debugger
    this.AddBookingForm = this.builder.group({
      trainbookingId: this.builder.control(0, Validators.required),
      source: this.builder.control('', Validators.required),
      destination: this.builder.control('',Validators.required),
      departureTime: this.builder.control(train.departureTime,Validators.required),
      arrivalTime: this.builder.control(train.arrivalTime,Validators.required),
    trainId: this.builder.control(0, Validators.required),
    userId: this.builder.control(0, Validators.required),
  })

    let userId : number | null = this.convertToNumberfromstring(sessionStorage.getItem('userId'))
debugger
    this.AddBookingForm.value.source=train.source;
    this.AddBookingForm.value.destination = train.destination;
    this.AddBookingForm.value.departureTime= train.departureTime;
    this.AddBookingForm.value.arrivalTime = train.arrivalTime;
    this.AddBookingForm.value.trainId= train.trainId;
    this.AddBookingForm.value.userId= userId;

    this.bookingService.addBooking(this.AddBookingForm.value).subscribe((res: any) => {
      debugger
      console.log(res);
      sessionStorage.setItem("bookingId", res.trainBookingId.toString());

debugger
    })
    this.router.navigateByUrl('booking')
  }
}
