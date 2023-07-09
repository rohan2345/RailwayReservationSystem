import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { BookingService } from 'src/app/booking.service';
import { Booking } from 'src/app/models/booking.model';

@Component({
  selector: 'app-view-bookins',
  templateUrl: './view-bookins.component.html',
  styleUrls: ['./view-bookins.component.css']
})
export class ViewBookinsComponent {

  constructor(
    private bookingService: BookingService,private router:Router,private route:ActivatedRoute
    ){}
    trainBookingId:string|null|undefined;
    isNewTrain=false;
  header='';
  booking: Booking = {
    trainBookingId:0,
    departureTime: new Date(),
    arrivalTime: new Date(),
    userId: 0,
    source: '',
    destination: '',
    trainId: 0
  };

    ngOnInit(): void {
      this.route.paramMap.subscribe(
        (params)=>{
         this.trainBookingId= params.get('id');
         if(this.trainBookingId){
         //if the routes contain the 'Add' ->new train functionality else existing

         if(this.trainBookingId.toLowerCase()==='add'){
          this.isNewTrain=true;
          this.header='Add New Train Details';
         }
         else{
          this.isNewTrain=false;
          this.header='Update Train Details';
          this.bookingService.getBooking(this.trainBookingId).subscribe(
            (succcessResponse)=>{
              console.log(succcessResponse);
             this.booking= succcessResponse;
            }
          );
         }
         }
        }
      );
    }

  onDelete():void{
    this.bookingService.cancelBooking(this.booking.trainBookingId).subscribe(
      (successResponse)=>{
        alert("deleted")
        // this.snackbar.open('Train deleted successfully',undefined,{
        //   duration:2000,
        //   horizontalPosition:'right',
        //   verticalPosition:'top'
        // }
        // );
        // setTimeout(()=>{
        //   this.router.navigateByUrl('train');
        // },1000);
      },
      (errorResponse)=>{
        alert("errror occured")
      }
    );
  }

  onUpdate():void{

    this.bookingService.updateBooking(this.booking.trainBookingId,this.booking).subscribe(
      (successResponse)=>{
        console.log(this.booking);
        //showing notification
        // this.snackbar.open('Train details updated successfully',undefined,{
        //   duration:2000
        // });
        alert("Updated");
      },
      (errorResponse)=>{

      }
    );
    }

    onAdd():void{
      this.bookingService.addBooking(this.booking).subscribe(
        (successResponse)=>{
          console.log(successResponse);

          // this.snackbar.open('Train added successfully',undefined,{
          //   duration:2000,
          //   horizontalPosition:'right',
          //   verticalPosition:'top'
          // });
          // setTimeout(()=>{
          //   this.router.navigateByUrl(`train/train/${successResponse.trainId}`);
          // },2000);
          alert("Added");
        },
        (errorResponse)=>{

        }
      );
      }

}
