import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PassengerService } from 'src/app/services/passenger.service';
import { TrainService } from 'src/app/services/train.service';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent implements OnInit {;
  trainDetails: any;

  constructor(private snackbar:MatSnackBar,private route: ActivatedRoute,private trainService: TrainService,
    private http: HttpClient,private router: Router,private passengerService:PassengerService) {}

  ngOnInit():void {
    this.route.queryParams.subscribe(params => {
      const trainId = params['trainId'];
      this.trainService.getTrain(trainId).subscribe(
        (trainDetailsResponse: any) => {
          this.trainDetails = trainDetailsResponse;
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      );
    });

  }
  passengerForm=new FormGroup({
    firstname: new FormControl("",
    [Validators.required,
      Validators.minLength(2),
      Validators.pattern("[a-zA-Z].*")]),
    lastname: new FormControl("",
    [Validators.required,
      Validators.minLength(2),
      Validators.pattern("[a-zA-Z].*")]
    ),
    age: new FormControl("",
    [Validators.required]),
    mobile: new FormControl("",
    [Validators.required,
      Validators.minLength(10),
      Validators.pattern("[0-9]*"),
      Validators.maxLength(10)]),
    gender: new FormControl("",[Validators.required])
});


displayMsg:string='';

passengerSubmitted(){
    console.log(this.passengerForm.valid);

    // this.passengerService.addPassenger([
    //   this.passengerForm.value.firstname as string,
    //   this.passengerForm.value.lastname as string,
    //   this.passengerForm.value.mobile as string,
    //   this.passengerForm.value.gender as string
    // ]).subscribe(res=>{
    //   if(res=='Added'){
    //    this.displayMsg="Passenger added";
    //    this.snackbar.open('Passenger added',undefined,{
    //     duration:2000,
    //     horizontalPosition:'right',
    //     verticalPosition:'top'
    //   });
    //    console.log(res);
    //    setTimeout(() => {
    //     this.router.navigate(['/payment']);
    //   }, 500);
    //   }
    //   else{
    //     this.displayMsg="please enter correct details";
    //   }
    // });
}

get FirstName():FormControl{
  return this.passengerForm.get("firstname") as FormControl
}
get LastName():FormControl{
  return this.passengerForm.get("lastname") as FormControl
}
get Mobile():FormControl{
  return this.passengerForm.get("mobile") as FormControl
}
get Age():FormControl{
  return this.passengerForm.get("age") as FormControl
}
get Gender():FormControl{
  return this.passengerForm.get("gender") as FormControl
}

}

