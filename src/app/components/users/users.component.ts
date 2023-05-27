import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/ui-model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
users:User[]=[];
displayedColumns: string[] = ['firstName', 'lastName', 'email', 'mobile','gender','edit'];
dataSource:MatTableDataSource<User>=new MatTableDataSource<User>();

@ViewChild(MatPaginator) matPaginator!:MatPaginator;
@ViewChild(MatSort) matSort!:MatSort;
filterString='';

constructor(private userService:UserService){}
ngOnInit(): void {
  this.userService.getUsers().subscribe(
    (successResponse)=>{
      this.users=successResponse;
      console.log(this.users);
      this.dataSource=new MatTableDataSource<User>(this.users);
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
filterUsers(){
  this.dataSource.filter=this.filterString.trim().toLowerCase();
}
}
