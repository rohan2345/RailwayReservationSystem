import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AuthGuard } from './services/auth.guard';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { UsersComponent } from './components/users/users.component';
import { ViewUserComponent } from './components/users/view-user/view-user.component';
import { TrainComponent } from './components/trains/train/train.component';
import { ViewTrainComponent } from './components/trains/view-train/view-train.component';
import { PassengerComponent } from './components/passenger/passenger.component';
import { BookingComponent } from './booking/booking.component';
import { BookinsComponent } from './bookins/bookins.component';
import { ViewBookinsComponent } from './bookins/view-bookins/view-bookins.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { PaymentComponent } from './components/payments/payment/payment.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
     pathMatch:'full'
  },
{
  path:'login',
  component:LoginComponent
},
{
  path:'passenger',
  component:PassengerComponent
},
{
path:'admin',
component:AdminNavbarComponent,
canActivate:[AuthGuard]
},
{
  path:'bookins',
  component:BookinsComponent
},
{
  path:'bookins/bookins/:id',
  component:ViewBookinsComponent
},
{
path:'user',
component:UsersComponent
},
{path:'about-us',
component:AboutUsComponent
},
{
path:'user/user/:id',
component:ViewUserComponent
},
{
  path: 'payment/:amount',
  component: PaymentComponent,
  canActivate: [AuthGuard]
},
{
path:'train/train/:id',
component:ViewTrainComponent
},
{
  path:'train/add',
  component:ViewTrainComponent
  },
{
  path:'register',
  component:RegisterComponent
},
// {
//   path:'',
//   redirectTo:'login',
//   pathMatch:'full'
// },
{
  path:'',
  component:HomeComponent,
},
{

  path:'booking',
  component:BookingComponent
},
{
  path:'train',
  component:TrainComponent,
},
{

  path:'home',
  component:HomeComponent,
},
{
  path:'**',
  component:PagenotfoundComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
