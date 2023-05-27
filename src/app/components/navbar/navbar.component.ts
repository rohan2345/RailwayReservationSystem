import { Component,OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isLoggedIn = false;
  userName: string | undefined;
  constructor(
    public authService: AuthService,
    private router: Router,
    private snackbar:MatSnackBar
  ) {}
  ngOnInit(): void {
    // this.isLoggedIn = this.authService.isLoggedin();
    this.isLoggedIn = this.authService.isLoggedin();
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.userName = `${user.firstname} ${user.lastname}`;
      } else {
        this.userName = '';
      }
    });
  }

  logOut() {
    this.authService.removeToken();
    this.isLoggedIn=false;
    this.snackbar.open('Logged out successfully',undefined,{
      duration:1000,
      horizontalPosition:'right',
      verticalPosition:'top'
    });
    this.router.navigateByUrl('/login');
  }
}
