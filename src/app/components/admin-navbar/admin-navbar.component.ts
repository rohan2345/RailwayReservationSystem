import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent {

  constructor(
    public authService: AuthService,
    private router: Router,
    private snackbar:MatSnackBar
  ) {}
  logOut() {
    this.authService.removeToken();
    this.snackbar.open('Logged out successfully',undefined,{
      duration:2000,
      horizontalPosition:'right',
      verticalPosition:'top'
    });
    this.router.navigateByUrl('/login');
  }
}
