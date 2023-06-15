import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

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

  ngOnInit(): void {
this.getLocalStoredData();
this.getCartDetails()

  }

  constructor( private apiservice: ApiService,) {

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
       }
  console.log(this.paidCourses);

      })

    });
  }
  onChange(selectedValue:any) {

    console.log(selectedValue.value);
    console.log(this.countryList);
    this.countryList.map((country: any) => {
      if (country.name === selectedValue.value.name) {
        this.states = country.states;
      }
    });

  }


}
