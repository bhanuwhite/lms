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


  public reactiveForm!: FormGroup;
  public country: any;
  public state :string[]=[]

  ngOnInit(): void {
    this.getLocalStorageData();
    this.reactiveForm = new FormGroup({

      country: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
    });

   }
  constructor(){}
  getLocalStorageData(){
    this.courseDetails = JSON.parse(localStorage.getItem('courseDetails') || '{}');
    console.log(this.courseDetails);
    this.discount=(this.courseDetails.price * 20)/100;
   this.total = this.courseDetails.price-this.discount
  }


 countries = [
    { name: 'USA', code: 'usa', states: ['New York', 'California'] },
    { name: 'Canada', code: 'canada', states: ['Ontario', 'Quebec'] },
    { name: 'Mexico', code: 'mexico', states: ['Mexico City'] },
    { name: 'India', code: 'India', states: ['Telangana','Andra Pradesh','Kerala','Maharastra','Goa'] }
  ];
sree:any
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
  function(){
    alert("heloo")
  }

}
