import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TrainService } from 'src/app/services/train.service';
import { Train } from 'src/app/models/ui-model/train.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayTrains: any = { source: '', destination: ''};

  trains: Train[] = [];
  isSearched = false;
  filteredTrains: Train[] | undefined;

  trainForm=new FormGroup({
    source:new FormControl("",[Validators.required]),
    destination : new  FormControl("",[Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private trainService: TrainService
  ) {}

  logOut() {
    this.authService.removeToken();
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    this.trainService.getTrains().subscribe(
      (successResponse: Train[]) => {
        this.trains = successResponse;
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
}
