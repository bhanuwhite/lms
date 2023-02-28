import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{
  courseDetails!: {price:number};
  discount!:number;
  total!:number;

  selectedCountry :any;
  states:any[] = [];

  public state :string[]=[]

  myForm: FormGroup =  new FormGroup({

    countryDropdown: new FormControl(null, Validators.required),
    stateDropdown: new FormControl(null, Validators.required),
    radioButtonOption: new FormControl(null, Validators.required),

});
 get radioButtonOption(){
  return this.myForm.get('radioButtonOption')
 }
  countries!: { name: string; code: string; states: string[]; }[];
  isSubmitted = false;

  ngOnInit(): void {
    this.getLocalStorageData();
   this.countries = [
      { name: 'USA', code: 'usa', states: ['New York', 'California'] },
      { name: 'Canada', code: 'canada', states: ['Ontario', 'Quebec'] },
      { name: 'Mexico', code: 'mexico', states: ['Mexico City'] },
      { name: 'India', code: 'India', states: ['Telangana','Andra Pradesh','Kerala','Maharastra','Goa'] }
    ];
   }

  constructor(){

  //   this.myForm = new FormGroup({

  //     countryDropdown: new FormControl(null, Validators.required),
  //     stateDropdown: new FormControl(null, Validators.required),
  //     radioButtonOption: new FormControl(null, Validators.required),

  // });
  }


    getLocalStorageData(){
    this.courseDetails = JSON.parse(localStorage.getItem('courseDetails') || '{}');
    console.log(this.courseDetails);
    this.discount=(this.courseDetails.price * 20)/100;
   this.total = this.courseDetails.price-this.discount
  }

//  countries = [
//     { name: 'USA', code: 'usa', states: ['New York', 'California'] },
//     { name: 'Canada', code: 'canada', states: ['Ontario', 'Quebec'] },
//     { name: 'Mexico', code: 'mexico', states: ['Mexico City'] },
//     { name: 'India', code: 'India', states: ['Telangana','Andra Pradesh','Kerala','Maharastra','Goa'] }
//   ];

  updateStates(event:any) {

    console.log(event.target.value);

    this.states=this.countries.filter( (data)=>{
  return data.name == event.target.value
    } )
    console.log(this.states[0].states);
    this.states =this.states[0].states;
    this.state=this.states[0].states

// for(let i=0;i<this.countries.length;i++){
//   if(event.target.value === this.countries[i].name){
//     this.states= this.countries[i].states;
//     console.log(this.states);

//   }
// }
  }

  submit(){

    this.isSubmitted = true;
    console.log(this.myForm);

  }

}
