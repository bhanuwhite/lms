import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { conversationObj } from 'src/app/interface';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
})
export class CommunityComponent implements OnInit {
  like: string = 'thumb_up';
  fill_color: string = 'black';
  displayConvesation!: boolean;
  displayDoubtImg!: boolean;

  imgData: conversationObj = {
    description: '',
    img: '',
    question: '',
  };

  featuredData = [
    {
      head: 'I would Love to take Admission in LMS',
      message:
        'It provides a good environment to learn and give great assignments to work on.',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbpdlfsyBLz7nSCkx0-gLvGtgQzW6peyJWtOp8AuFt-7TXpoRQ-XgkVIhvpfLC3Gq4kcY&usqp=CAU',
      name: 'Rossi cristina',
      id: 201,
    },
    {
      head: 'Do not need attention from.',
      message:
        'Always focussing their students growth. Such a wonderfull experience in LMS.',
      img: 'https://qph.cf2.quoracdn.net/main-qimg-4aa93ebe1b36c01c529863ad32aa8187-lq',
      name: 'Jessica ',
      id: 202,
    },
    {
      head: 'I would Love to take Admission in LMS',
      message:
        'It provides a good environment to learn and give great assignments to work on.',
      img: 'data:image/jpeg;base64,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',
      name: 'Jenni Bheem',
      id: 203,
    },
  ];

  trendingData = [
    {
      question: 'Dare to ask a question ?',
      description: 'No one will get the answer untill they ask. ',
      img: 'https://qph.cf2.quoracdn.net/main-qimg-4aa93ebe1b36c01c529863ad32aa8187-lq',
      name: 'Jessica ',
    },
    {
      question: 'How this community will help you ? ',
      description: `During the time of class you may or may not get some doubt. Sometimes your doubt would
        come after some days, then in that case you can post your questions or doubts in this community. You
        will definetly get help from tutors or someone, who know about it better. So do not hesitate to ask
        any question or doubt. `,
      img: 'data:image/jpeg;base64,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',
      name: 'TeamLMS ',
    },
    {
      question: 'Do I definetly get a job by this course ?',
      description: `Definetly we do not say You would get a job by completing this course. But we will
        definetly gives you the confidence to survive in this Tech World. `,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbpdlfsyBLz7nSCkx0-gLvGtgQzW6peyJWtOp8AuFt-7TXpoRQ-XgkVIhvpfLC3Gq4kcY&usqp=CAU',
      name: 'TemaLMS ',
    },
  ];

  unAnsweredData = [
    {
      head: 'My Story',
      message: 'I need to improve my proficiency in code and I will do that.',
      name: 'Roman Sangaria',
      artName: 'myStory of lIfe',
      id: 101,
    },
    {
      head: 'Question the ends.',
      message:
        'No one will answer untill you push them to answer. So be ready for it.',
      name: 'Mahesh',
      artName: 'needSpaceToAsk',
      id: 102,
    },
    {
      head: 'Can you ask?',
      message:
        'If a tutor is busy, One can answer that who knows well. So take a step towards your fear.',
      name: 'Nikolath fharid',
      artName: 'TakeMeThere.',
      id: 103,
    },
    {
      head: 'Do R&D for your self...',
      message: 'How can you depend on someone you do not know. ',
      name: 'Raghu Sisodial',
      artName: 'NeedR&D',
      id: 104,
    },
    {
      head: 'What is your rating in this course?',
      message:
        ' Before joining this course, I can give my self 4 on 10. But now Its 8 on 10. ',
      name: 'Sree Olivia',
      artName: 'sheThoughtsOnMe',
      id: 105,
    },
  ];
  conversationForm!: FormGroup;

  constructor(public fb: FormBuilder) {
    this.conversationForm = this.fb.group({
      question: new FormControl(''),
      description: new FormControl(''),
      image: new FormControl(''),
    });
  }
  ngOnInit(): void {}

  public likeFun(): void {
    if (this.like == 'thumb_up') {
      this.like = 'recommend';
      this.fill_color = 'red';
    } else {
      this.like = 'thumb_up';
      this.fill_color = 'black';
    }
  }
  public showConversationDialog(): void {
    this.displayConvesation = true;
  }

  public showDoubtImgDialog(trending: conversationObj): void {
    this.imgData = trending;
    this.displayDoubtImg = true;
  }

  localImgUrl: any;
  selectImg(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      return;
    }
    if (event.target.files[0].type.match(/image\/*/) == null) {
      return;
    }
    let reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.localImgUrl = reader.result;
    };
  }

  conversationObj: {
    question: string;
    description: string;
    img: string;
    name: string;
  } = {
    description: '',
    img: '',
    name: '',
    question: '',
  };
  public questionSubmit(): void {
    this.conversationObj = {
      question: this.conversationForm.value.question,
      description: this.conversationForm.value.question,
      img: this.localImgUrl,
      name:""
    };
    this.trendingData.push(this.conversationObj);
    setTimeout(() => {
      this.displayConvesation = false;
    }, 50);
    this.conversationForm.reset();
  }
}
