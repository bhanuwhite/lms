import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ExternalLibraryService } from './util';
import { AboutService } from 'src/app/services/about.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{
  // courseDetails!: { price: number };
  discount!: number;
  totalAmount!: number;
  cities:any[]=[];
  selectedCity1!: {};
  countryList: any;
states:any;
userID!:number;
paidCourses:any[]=[];
finalPayment!:number;
response:any;
razorpayResponse :any;
showModal = false;


  ngOnInit(): void {
this.getLocalStoredData();
this.getCartDetails();

// this.razorpayService
// .lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js')
// .subscribe();

  }




  constructor( private apiservice: ApiService,
    private aboutServ :AboutService,
     private razorpayService: ExternalLibraryService,
     private cd: ChangeDetectorRef,
     private route:Router) {

    this.countryList = [
      {
        name: "India",
        code: "in",
        states: [
          { value: "Andra Pradesh", "sCode": "AP" },
          { value: "Telangana", "sCode": "TG" },
          { value: "TamilNadu", "sCode": "TN" },
          { value: "Maharastra", "sCode": "MH" },
          { value: "Madya Pradesh", "sCode": "MP" }
        ]
      },
      {
        name: "China",
        code: "cn",
        states: [
          { value: "Hainan", "sCode": "HN" },
          { value: "Fujain", "sCode": "FN" },
          { value: "Sichuan", "sCode": "SN" }
        ]
      },

      {
        name: "USA",
        code: "us",
        states: [
          { value: "Califoria", "sCode": "CF" },
          { value: "Texas", "sCode": "TX" },
          { value: "Alaska", "sCode": "AS" }
        ]
      }
    ]

  }

  public getLocalStoredData() {
    const localStoredData = JSON.parse(localStorage.getItem('user')!);
    this.userID = localStoredData.id;
  }
  public getCartDetails(){
    this.totalAmount=0;
    this.paidCourses=[];
    this.apiservice.getUserCart(this.userID).subscribe( (res:any)=>{
      res.map((course:any) =>{
       if (course.course_ids[0].price != 0) {
             this.paidCourses.push(course);

          this.totalAmount =this.totalAmount +  JSON.parse(course.course_ids[0].price);
          this.discount = this.totalAmount * 0.05
          this.finalPayment = (this.totalAmount - this.discount)
       }

      })

    });
  }
  onChange(selectedValue:any) {

    this.countryList.map((country: any) => {
      if (country.name === selectedValue.value.name) {
        this.states = country.states;
      }
    });

  }
  orderId !:number;
  RAZORPAY_OPTIONS = {
    key: 'rzp_test_fv78mxq1yb7Yj6',
    amount: '',
    currency:"INR",
    name: 'LMS',
    order_id: this.orderId,
    "handler": function (response:any){
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature)
  },
    description: 'Payment',
        image:
      'data:image/png;base64,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',

      prefill: {
      name: '',
      email: 'test@test.com',
      contact: '',
      method: '',
    },
    modal: {

    },
    theme: {
      color: '#1F75FE',
    },
  }



  public pay() {

    this.RAZORPAY_OPTIONS.amount = this.finalPayment.toFixed(0) + '00';

    // binding this object to both success and dismiss handler

    this.RAZORPAY_OPTIONS['handler'] = this.razorPaySuccessHandler.bind(this);

    // this.showPopup();

    let razorpay = new this.aboutServ.nativeWindow.Razorpay(this.RAZORPAY_OPTIONS);
    razorpay.open();



  }

  paymentSuccess:any;
  public razorPaySuccessHandler(response:any) {

    this.razorpayResponse = `Razorpay Response`;

    this.showModal = true;
    this.cd.detectChanges();
    const element = document.getElementById('razorpay-response');
if (element !== null) {
  element.style.display = 'block';
}

this.afterPayment(response.razorpay_payment_id)
// this.route.navigate(['/user/library'])
  }

  afterPayment(paymentId:string){


  this.paidCourses.map((course:any)=>{

    const courseDetails = {
      data: {
        course_ids: course.course_ids[0].id,
        user_id: this.userID,
      },
    };

    this.apiservice.postUserHasCourse(courseDetails).subscribe((res) => {

      });

this.apiservice.deleteCartItem(course.id).subscribe((res:any)=>{

    })
  })
  this.route.navigate(['/user/mycart'])
  };


  }



