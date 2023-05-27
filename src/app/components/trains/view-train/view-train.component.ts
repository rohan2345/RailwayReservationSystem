import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Train } from 'src/app/models/train.model';
import { TrainService } from 'src/app/services/train.service';

@Component({
  selector: 'app-view-train',
  templateUrl: './view-train.component.html',
  styleUrls: ['./view-train.component.css']
})
export class ViewTrainComponent {
  trainId:string|null|undefined;
  train:Train={
  trainName: '',
  source: '',
  destination: '',
  departureTime: '',
  arrivalTime: '',
  fare:0,
  totalSeats:0,
  availableSeats:0,
  trainId:''
  };
  isNewTrain=false;
  header='';
constructor(private readonly trainService:TrainService,private readonly route:ActivatedRoute,private snackbar:MatSnackBar,private router:Router){}
ngOnInit(): void {
  this.route.paramMap.subscribe(
    (params)=>{
     this.trainId= params.get('id');
     if(this.trainId){
     //if the routes contain the 'Add' ->new student functionality else existing

     if(this.trainId.toLowerCase()==='add'){
      this.isNewTrain=true;
      this.header='Add New Train Details';
     }
     else{
      this.isNewTrain=false;
      this.header='Update Train Details';
      this.trainService.getTrain(this.trainId).subscribe(
        (succcessResponse)=>{
          console.log(succcessResponse);
         this.train= succcessResponse;
        }
      );
     }
     }
    }
  );
}
onUpdate():void{

this.trainService.updateTrain(this.train.trainId,this.train).subscribe(
  (successResponse)=>{
    console.log(this.train);
    //showing notification
    this.snackbar.open('Train details updated successfully',undefined,{
      duration:2000
    });
  },
  (errorResponse)=>{

  }
);
}

onDelete():void{
  this.trainService.deleteTrain(this.train.trainId).subscribe(
    (successResponse)=>{
      this.snackbar.open('Train deleted successfully',undefined,{
        duration:2000,
        horizontalPosition:'right',
        verticalPosition:'top'
      }
      );
      setTimeout(()=>{
        this.router.navigateByUrl('train');
      },1000);
    },
    (errorResponse)=>{

    }
  );
}
onAdd():void{
this.trainService.addTrain(this.train).subscribe(
  (successResponse)=>{
    console.log(successResponse);

    this.snackbar.open('Train added successfully',undefined,{
      duration:2000,
      horizontalPosition:'right',
      verticalPosition:'top'
    });
    setTimeout(()=>{
      this.router.navigateByUrl(`train/train/${successResponse.trainId}`);
    },2000);
  },
  (errorResponse)=>{

  }
);
}

}
