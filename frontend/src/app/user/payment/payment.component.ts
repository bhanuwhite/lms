import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ExternalLibraryService } from './util';
import { AboutService } from 'src/app/services/about.service';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';
import { MessageService } from 'primeng/api';

interface countryListArr {
  name:string, code:string, states:statesInterface[]
}
interface statesInterface {
  value:string, sCode:string
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers: [AboutService, MessageService],
})
export class PaymentComponent implements OnInit {
  discount: number = 0;
  totalAmount!: number;
  selectedCity1!: {};
  countryList: countryListArr[];
  states!: statesInterface[];
  userID!: number;
  paidCourses: any[] = [];
  finalPayment!: number;
  response: any;
  razorpayResponse: any;
  showModal = false;
  public img_url = environment.apiUrl;

  ngOnInit(): void {
    this.getLocalStoredData();
    this.getCartDetails();
    setTimeout(() => {
      this.createOrderId();
    }, 1500);
    this.razorpayService
      .lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js')
      .subscribe();
  }

  constructor(
    private apiservice: ApiService,
    private aboutServ: AboutService,
    private razorpayService: ExternalLibraryService,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private route: Router
  ) {
    this.countryList = [
      {
        name: 'India',
        code: 'in',
        states: [
          { value: 'Andra Pradesh', sCode: 'AP' },
          { value: 'Telangana', sCode: 'TG' },
          { value: 'TamilNadu', sCode: 'TN' },
          { value: 'Maharastra', sCode: 'MH' },
          { value: 'Madya Pradesh', sCode: 'MP' },
        ],
      },
      {
        name: 'China',
        code: 'cn',
        states: [
          { value: 'Hainan', sCode: 'HN' },
          { value: 'Fujain', sCode: 'FN' },
          { value: 'Sichuan', sCode: 'SN' },
        ],
      },
      {
        name: 'USA',
        code: 'us',
        states: [
          { value: 'Califoria', sCode: 'CF' },
          { value: 'Texas', sCode: 'TX' },
          { value: 'Alaska', sCode: 'AS' },
        ],
      },
    ];
  }

  public getLocalStoredData() {
    const localStoredData = JSON.parse(localStorage.getItem('user')!);
    this.userID = localStoredData.id;
  }
  public getCartDetails() {
    this.totalAmount = 0;
    this.paidCourses = [];
    this.apiservice.getUserCart(this.userID).subscribe((res: any) => {
      res.map((course: any) => {
        if (course.course_ids.length != 0 && course.course_ids[0].price != 0) {
          this.paidCourses.push(course);
          this.totalAmount =
            this.totalAmount + JSON.parse(course.course_ids[0].price);
          this.finalPayment = this.totalAmount - this.discount;
        }
      });
    });
  }
  onChange(selectedValue: any) {
    this.countryList.map((country: any) => {
      if (country.name === selectedValue.value.name) {
        this.states = country.states;
      }
    });
  }

  orderId!: number;
  createOrderId() {
    const paymentBody = {
      amount: this.finalPayment?.toFixed(0) + '00',
    };
    this.apiservice.postPayment(paymentBody).subscribe((res) => {
      this.orderId = res.orderId;
    });
  }

  onPay() {
    const options = {
      key: 'rzp_test_fv78mxq1yb7Yj6',
      amount: this.finalPayment?.toFixed(0) + '00',
      currency: 'INR',
      name: 'LMS Project',
      description: 'Buy Course',
      order_id: this.orderId,
      handler: (response: any) => {
        const requestBody = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorapay_signature: response.razorapay_signature,
          amount: this.finalPayment.toFixed(0),
        };
        this.apiservice.postPaymentVerify(requestBody).subscribe((res) => {
          this.afterPayment(this.orderId);
        });
      },
      theme: {
        color: '#99cc33',
      },
    };

    const rzp = new this.aboutServ.nativeWindow.Razorpay(options);
    rzp.on('payment.failed', (response: any) => {
      this.messageService.add({
        severity: 'warning',
        summary: 'Payment failed',
        detail: 'Please try again',
      });
    });

    rzp.open();
  }

  afterPayment(order_id: any) {
    this.paidCourses.map((course: any) => {
      const courseDetails = {
        data: {
          course_ids: course.course_ids[0].id,
          user_id: this.userID,
        },
      };

      this.apiservice.postUserHasCourse(courseDetails).subscribe((res) => {});

      this.apiservice.deleteCartItem(course.id).subscribe((res: any) => {
        this.route.navigate(['/user/mycart']);
      });

      // const paymentDetails ={
      //   course_ids: course.course_ids[0].id,
      //   user_id: this.userID,

      // }
    });
  }
}
