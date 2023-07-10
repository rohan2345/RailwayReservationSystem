import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginAuth:AuthService,private router:Router,private snackbar:MatSnackBar){}
  ngOnInit():void{

  }
  loginForm=new FormGroup({
    email:new FormControl("",[Validators.required,Validators.email]),
    pwd : new  FormControl("",[
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
  });
  displayMsg:string='';
  isUserValid:boolean=false;
  isLogin:boolean=false;

  loginSubmited(){
    this.loginAuth
    .loginUser([this.loginForm.value.email as string,this.loginForm.value.pwd as string])
    .subscribe((res)=>{
       if(res=='Failure'){
        this.isUserValid=false;
        alert("Login Unsuccessful");
       }else{
        console.log(res+"response coming");
        this.isLogin=true;
        this.displayMsg="Login Successful."
        this.isUserValid=true;
        const responseObj = JSON.parse(res);
        const token = responseObj.token;
        this.loginAuth.setToken(token);
        const userId = responseObj.userId;
        const email = responseObj.email;

        sessionStorage.setItem('userId', userId.toString());
        sessionStorage.setItem('email', email.toString());

        this.snackbar.open('Logged in successfully',undefined,{
          duration:2000,
          horizontalPosition:'right',
          verticalPosition:'top'
        });
        // this.router.navigateByUrl('/home');
        const currentUser = this.loginAuth.currentUser.getValue();
        if (currentUser && currentUser.email === 'admin234@gmail.com') {
          this.loginAuth.isAdmin = true;
          this.router.navigateByUrl('/admin');
        } else {
          this.loginAuth.isAdmin = false;
          this.router.navigateByUrl('/home');
        }
       }
    });
  }
  setToken(token:string){
    localStorage.setItem("access_token",token);
  }

  get Email():FormControl{
    return this.loginForm.get('email') as FormControl;
  }
  get PWD():FormControl{
    return this.loginForm.get('pwd') as FormControl;
  }
}

