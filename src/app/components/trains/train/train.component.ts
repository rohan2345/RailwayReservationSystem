import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Train } from 'src/app/models/train.model';
import { TrainService } from 'src/app/services/train.service';


@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css']
})

export class TrainComponent implements OnInit {
  trains:Train[]=[];
  displayedColumns: string[] = ['trainName', 'source', 'destination','departureTime','arrivalTime','fare','totalSeats','availableSeats','edit'];
  dataSource:MatTableDataSource<Train>=new MatTableDataSource<Train>();

  @ViewChild(MatPaginator) matPaginator!:MatPaginator;
  @ViewChild(MatSort) matSort!:MatSort;
  filterString='';

  constructor(private trainService:TrainService){}
  ngOnInit(): void {
    this.trainService.getTrains().subscribe(
      (successResponse: Train[])=>{
        this.trains=successResponse;
        console.log(this.trains);
        this.dataSource=new MatTableDataSource<Train>(this.trains);
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
  filterTrains(){
    this.dataSource.filter=this.filterString.trim().toLowerCase();
  }
  }

