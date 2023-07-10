import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Payment } from 'src/app/models/Payment.model';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  bookedTrain!: any;
  amount: number = 0;
  paymentForm!: FormGroup;
  payment: Payment = new Payment();
  status: boolean = false;



  constructor(private authService: AuthService,
    private dataService: DataService,
    private paymentService: PaymentService,
    private activeRoute: ActivatedRoute,
    private builder: FormBuilder,
    private emailService : EmailService){

      this.dataService.Data$.subscribe((res) => {
        debugger
        this.bookedTrain = res[0];
        console.log('this is '+res[0]);

  })

    this.getAmount();

    }

    ngOnInit() {
      this.paymentform();
    }


    getAmount(){
      debugger
      this.activeRoute.paramMap.subscribe((res) => {
        let amount = res.get('amount');
        debugger
        if (amount !== null) {
          debugger
          this.amount = +amount;
        }
      });
    }

    convertToNumberfromstring(value: string | null): number | null {
      if (value === null) {
        return null;
      }

      const parsedValue = parseInt(value, 10);

      if (isNaN(parsedValue)) {
        return null;
      }

      return parsedValue;
    }

    paymentform() {
      this.paymentForm = this.builder.group({
        cardNumber: this.builder.control('', Validators.required),
        expirationDate: this.builder.control('', Validators.required),
        cvv: this.builder.control('', Validators.required),
        cardName: this.builder.control('', Validators.required),
        amount: this.builder.control({value: this.amount, disabled: true}, Validators.required),
      });
      debugger
    }


    Payment(){
      if(this.paymentForm.valid){
        debugger
        let bid =  this.convertToNumberfromstring(sessionStorage.getItem('bookingId'))
        let bookId: number;

        if (bid !== null) {
          debugger;
          bookId = +bid;
          this.payment.trainBookingId = +bid;
        }
        debugger
        this.payment.paymentStatus = true;
        this.payment.totalPrice = this.amount;
        this.payment.paymentTime= new Date;
        this.payment.paymentMethod = 'card';

        this.paymentService.addPayment(this.payment).subscribe((res: any)=>
        {
          debugger
          let email = sessionStorage.getItem('email');
          console.log(email);
          console.log(res);
          if(res){
            debugger
            alert("Payment success")
            // this.toast.success({detail:'Payment Success'});
            let subject = "Train Ticket Booked"
            let body = "Congratulation! Your Train Ticket Booked Successfully"
            debugger


            let message = {email, subject, body}
            debugger
            this.emailService.sendEmail(message).subscribe({
              next:(res)=>{
                debugger
                  console.log(res);
                  alert("email sent")
              },
              error:(err)=>{
                console.log(err)
              }
            })
          }else{
            debugger
            alert("try again")
          }
        }
        );
      }
    }


}
