import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  repeatPass:string='none';
  displayMsg:string='';
  isAccountCreated:boolean=false;
          constructor(private authService:AuthService,private router:Router,private snackbar:MatSnackBar){}
          ngOnInit(): void {

          }
          registerForm=new FormGroup({
              firstname: new FormControl("",
              [Validators.required,
                Validators.minLength(2),
                Validators.pattern("[a-zA-Z].*")]),
              lastname: new FormControl("",
              [Validators.required,
                Validators.minLength(2),
                Validators.pattern("[a-zA-Z].*")]
              ),
              email: new FormControl("",
              [Validators.required,
              Validators.email]),
              mobile: new FormControl("",
              [Validators.required,
                Validators.minLength(10),
                Validators.pattern("[0-9]*"),
                Validators.maxLength(10)]),
              gender: new FormControl("",[Validators.required]),
              pwd: new FormControl("",
              [Validators.required,
                Validators.minLength(6),
                Validators.maxLength(15)]),
              rpwd: new FormControl("")
          });

          registerSubmitted(){
            if(this.PWD.value===this.RPWD.value){
              console.log(this.registerForm.valid);
              this.repeatPass='none'

              this.authService.registerUser([
                this.registerForm.value.firstname as string,
                this.registerForm.value.lastname as string,
                this.registerForm.value.email as string,
                this.registerForm.value.mobile as string,
                this.registerForm.value.gender as string,
                this.registerForm.value.pwd as string
              ]).subscribe(res=>{
                if(res=='Success'){
                 this.displayMsg="Account successfully created. Redirecting to login page...";
                 this.snackbar.open('Account successfully created. Redirecting to login page...',undefined,{
                  duration:2000,
                  horizontalPosition:'right',
                  verticalPosition:'top'
                });
                 this.isAccountCreated=true;
                 console.log(res);
                 setTimeout(() => {
                  this.router.navigate(['/login']);
                }, 500);
                }
                else if(res==="Already Exist"){
                  this.displayMsg="Account Already Exist.Try another Email";
                  this.isAccountCreated=false;
                }else{
                  this.displayMsg="Something went wrong";
                  this.isAccountCreated=false;
                  console.log(res);
                }
              });
            }
            else{
              this.repeatPass='inline'
            }
          }
          get FirstName():FormControl{
            return this.registerForm.get("firstname") as FormControl
          }
          get LastName():FormControl{
            return this.registerForm.get("lastname") as FormControl
          }
          get Email():FormControl{
            return this.registerForm.get("email") as FormControl
          }
          get Mobile():FormControl{
            return this.registerForm.get("mobile") as FormControl
          }
          get Gender():FormControl{
            return this.registerForm.get("gender") as FormControl
          }
          get PWD():FormControl{
            return this.registerForm.get("pwd") as FormControl
          }
          get RPWD():FormControl{
            return this.registerForm.get("rpwd") as FormControl
          }
}
