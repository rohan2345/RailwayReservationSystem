import { Component, ViewChild } from '@angular/core';
import { BookingService } from '../booking.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Booking } from '../models/booking.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bookins',
  templateUrl: './bookins.component.html',
  styleUrls: ['./bookins.component.css']
})
export class BookinsComponent {
  booking:Booking[]=[];
  displayedColumns: string[] = ['trainBookingId','trainId','userId', 'source', 'destination', 'departureTime','arrivalTime','edit'];
  dataSource:MatTableDataSource<Booking>=new MatTableDataSource<Booking>();

  @ViewChild(MatPaginator) matPaginator!:MatPaginator;
  @ViewChild(MatSort) matSort!:MatSort;
  filterString='';

  constructor(private bookingService:BookingService,snackbar:MatSnackBar,router:Router){}
  ngOnInit(): void {
    this.bookingService.getBookings().subscribe(
      (successResponse)=>{
        debugger
        console.log(successResponse);

        this.booking=successResponse;
        console.log(this.booking);
        this.dataSource=new MatTableDataSource<Booking>(this.booking);
        if(this.matPaginator){
          this.dataSource.paginator=this.matPaginator;
        }
        if(this.matSort){
          this.dataSource.sort=this.matSort;
        }
      },
      (errorResponse)=>{
        console.log(errorResponse);
      }
    );
  }
  filterBookings(){
    this.dataSource.filter=this.filterString.trim().toLowerCase();
  }

}
