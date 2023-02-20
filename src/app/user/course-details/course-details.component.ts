import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ratingObj, QAcategory } from '../../interface';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit{

  progressBarValue1 = 75;
  progressBarValue2 = 55;
  progressBarValue3 = 30;
  progressBarValue4 = 25;
  progressBarValue5 = 10;
  avgRatingVal: number = 5
  ratingVal1: number = 5;
  ratingVal2: number = 4;
  ratingVal3: number = 3;
  ratingVal4: number = 2;
  ratingVal5: number = 1;
  course_Details: { videoUrl: string } = {
    videoUrl: '',
  };
  jsonCourse_Details: { videoUrl: string } = {
    videoUrl: '',
  };
  // faShare = faShare;
  // faMessage = faMessage;
  // faThumbsUp = faThumbsUp;
  // faStar = faStar;
  // faSearch = faSearch;
  myValue = 45
  reViews: {
    name: string;
    image: string;
    rating: number;
    date: string;
    review: string;
  }[] = [
      {
        name: 'Mahesh',
        image:
          'https://i.pinimg.com/474x/4b/d5/d7/4bd5d78656591dbe5868562168adaef3.jpg',
        rating: 5,
        date: '',
        review:
          'I really loved this course n I learned so much knowledge with this course.',
      },
      {
        name: 'Ajay',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWXYJHhVG2u98tzNTsjA9DPRJa1dif2CNV0w&usqp=CAU',
        rating: 3,
        date: '',
        review:
          'Overall its a good course. Need more information for all topics which they provide.',
      },
      {
        name: 'Shekar',
        image:
          'https://www.notsoporangi.com/upload/media/entries/2018-06/11/746-3-12fad64ea66aa5787fbfcce858e32cb7.jpg',
        rating: 2,
        date: '',
        review:
          'Am not impressed with their teaching way. Amount charges are high. Overall Just ok.They did not reach my price pay value.',
      },
      {
        name: 'Mahesh',
        image:
          'https://i.pinimg.com/474x/4b/d5/d7/4bd5d78656591dbe5868562168adaef3.jpg',
        rating: 5,
        date: '',
        review:
          'I really loved this course n I learned so much knowledge with this course.',
      },
      {
        name: 'Ajay',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWXYJHhVG2u98tzNTsjA9DPRJa1dif2CNV0w&usqp=CAU',
        rating: 3,
        date: '',
        review:
          'Overall its a good course. Need more information for all topics which they provide.',
      },
      {
        name: 'Mahesh',
        image:
          'https://i.pinimg.com/474x/4b/d5/d7/4bd5d78656591dbe5868562168adaef3.jpg',
        rating: 5,
        date: '',
        review:
          'I really loved this course n I learned so much knowledge with this course.',
      },
      {
        name: 'Ajay',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWXYJHhVG2u98tzNTsjA9DPRJa1dif2CNV0w&usqp=CAU',
        rating: 3,
        date: '',
        review:
          'Overall its a good course. Need more information for all topics which they provide.',
      },
    ];
  reviews: {
    name: string;
    image: string;
    rating: number;
    date: string;
    review: string;
  }[] = [
      {
        name: '',
        image: '',
        rating: 5,
        date: '',
        review: '',
      },
    ];

  filterRating: ratingObj[];
  AllLectures: QAcategory[];
  recommended: QAcategory[];
  filterQuestion: QAcategory[];
  constructor() {
    this.filterRating = [
      { rating: 5 },
      { rating: 4 },
      { rating: 3 },
      { rating: 2 },
      { rating: 1 },
    ];
    this.AllLectures = [
      { key: 'Current Lecture ' }
    ];
    this.recommended = [
      { key: 'Most Recent' },
      { key: 'Most upvoted' }
    ];
    this.filterQuestion = [
      { key: 'Question am Following' },
      { key: 'I asked questioned' },
      { key: 'Question without Response' },
    ];
  }
  ngOnInit(): void {
    this.readingLocaltorage();
    this.reviews = this.reViews;
  }
  public readingLocaltorage(): void {
    this.jsonCourse_Details = JSON.parse(
      localStorage.getItem('courseDetails') || '{}'
    );
    this.course_Details = this.jsonCourse_Details;
  }
  public filterByRating(eventValue: any) {
    try {
      if (eventValue.target.value === 'ALL') {
        this.reviews = this.reViews;
      } else {
        this.reviews = this.reViews.filter((each) => {
          return each.rating == eventValue.target.value;
        });
      }
    } catch (error) {
      console.log(error);
    }
  }


}
