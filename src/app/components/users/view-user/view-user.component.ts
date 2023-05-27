import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/ui-model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  userId:string|null|undefined;
  user:User={
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    mobile: '',
    userId: '',
    pwd:''
  }
constructor(private readonly userService:UserService,private readonly route:ActivatedRoute,private snackbar:MatSnackBar,private router:Router){}
ngOnInit(): void {
  this.route.paramMap.subscribe(
    (params)=>{
     this.userId= params.get('id');
     if(this.userId){
      this.userService.getUser(this.userId).subscribe(
        (succcessResponse)=>{
         this.user= succcessResponse;
        }
      );
     }
    }
  );
}
onUpdate():void{
//calling user service to update user

this.userService.updateUser(this.user.userId,this.user).subscribe(
  (successResponse)=>{
    console.log(this.user);
    //showing notification
    this.snackbar.open('User details updated successfully',undefined,{
      duration:2000
    });
  },
  (errorResponse)=>{

  }
);
}

onDelete():void{
  this.userService.deleteUser(this.user.userId).subscribe(
    (successResponse)=>{
      this.snackbar.open('User deleted successfully',undefined,{
        duration:2000,
        horizontalPosition:'right',
        verticalPosition:'top'
      }
      );
      setTimeout(()=>{
        this.router.navigateByUrl('user');
      },1000);
    },
    (errorResponse)=>{

    }
  );
}

}
