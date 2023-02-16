import { Component, OnInit } from '@angular/core';
import {
  faShare,
  faMessage,
  faThumbsUp,
  faStar
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
  course_Details: any = {};
  jsonCourse_Details: any = {};
  faShare = faShare;
  faMessage = faMessage;
  faThumbsUp = faThumbsUp;
  faStar=faStar
  reviews:{ "name": string; "image": string; "rating": number; "date": string; "review": string;}[] = [
    {
      name: 'Mahesh',
      image: 'https://i.pinimg.com/474x/4b/d5/d7/4bd5d78656591dbe5868562168adaef3.jpg',
      rating: 5,
      date: '',
      review:
        'I really loved this course n I learned so much knowledge with this course.',
    },
    {
      name:"Ajay",
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWXYJHhVG2u98tzNTsjA9DPRJa1dif2CNV0w&usqp=CAU",
      rating:3,
      date:'',
      review:"Overall its a good course. Need more information for all topics which they provide."
    },
    {
      name:"Shekar",
      image:"https://www.notsoporangi.com/upload/media/entries/2018-06/11/746-3-12fad64ea66aa5787fbfcce858e32cb7.jpg",
      rating:2,
      date:'',
      review:"Am not impressed with their teaching way. Amount charges are high. Overall Just ok.They did not reach my price pay value."
    }
  ];
  ngOnInit(): void {
    this.jsonCourse_Details = localStorage.getItem('courseDetails');
    this.course_Details = JSON.parse(this.jsonCourse_Details);
    console.log(this.course_Details);
  }
}
