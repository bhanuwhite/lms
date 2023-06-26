import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Quiz,
  QuizData,
  QuizDetails,
  QuizResponse,
  answers,
  level,
} from 'src/app/models/quiz';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.scss'],
})
export class QuizDetailsComponent implements OnInit {
  public courseName: string = '';
  public quizBeginerDetails: QuizDetails[] = [];
  public quizintermidiateDetails: QuizDetails[] = [];
  public quizAdvancedDetails: QuizDetails[] = [];
  public isCorrect: boolean = false;
  public selectedIndex = -1;

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.courseName = localStorage.getItem('CourseName')!;
    this.getQuizDetails();
  }
  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  public getQuizDetails() {
    this.apiService.getQuiz().subscribe((res) => {
      res.data.filter((result: any) => {
        if (result.attributes.course_name == this.courseName) {
          //Begginer Level
          if (result.attributes.level == 'beginner') {
            this.quizBeginerDetails.push(result);

            this.quizBeginerDetails.forEach((question) => {
              question.questionStates = {
                isCorrect: false,
                correctAnswer: null,
                visible: false,
                selectedOption: null,
                selectedIndex: -1,
              };
            });
          }
          //Intermedite Level
          else if (result.attributes.level == 'intermediate') {
            this.quizintermidiateDetails.push(result);

            this.quizintermidiateDetails.forEach((question) => {
              question.questionStates = {
                isCorrect: false,
                correctAnswer: null,
                visible: false,
                selectedOption: null,
                selectedIndex: -1,
              };
            });
          }
          // Advanced Level
          else if (result.attributes.level == 'advanced') {
            this.quizAdvancedDetails.push(result);

            this.quizAdvancedDetails.forEach((question) => {
              question.questionStates = {
                isCorrect: false,
                correctAnswer: null,
                visible: false,
                selectedOption: null,
                selectedIndex: -1,
              };
            });
          }
        }
      });
    });
  }

  onChange(question: QuizDetails, option: string, cardIndex: number) {
    question.questionStates.selectedIndex = cardIndex;
    question.questionStates.correctAnswer = JSON.parse(
      question.attributes.answers
    );
    question.questionStates.selectedOption = option;
  }

  checkAnswer(question: QuizDetails) {
    question.questionStates.visible = true;
    question.questionStates.correctAnswer = JSON.parse(
      question.attributes.answers
    );

    if (
      question.questionStates.selectedOption ===
      question.questionStates.correctAnswer
    ) {
      question.questionStates.isCorrect = true;
    } else {
      question.questionStates.isCorrect = false;
    }
  }

  hideAnswer(question: QuizDetails) {
    question.questionStates.visible = false;
  }
}
