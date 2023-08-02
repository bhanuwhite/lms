import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  public userQuizDetails: QuizDetails[] = [];
  public quizintermidiateDetails: QuizDetails[] = [];
  public quizAdvancedDetails: QuizDetails[] = [];
  public isCorrect: boolean = false;
  public selectedIndex = -1;
  public showAssessment: boolean = false;
  public assessmentStatus: string = '';
  public viewAns: boolean = false;
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getUserLevel('beginner');
    this.getTechName();
  }
  public getTechName(): void {
    this.route.params.subscribe((res) => {
      this.courseName = res['course'];
    });
  }
  public assessmentLevel: string = '';
  public assessmentCutoff: number = 0;
  public headerName: string = '';
  public getUserLevel(level: string): void {
    this.headerName = level;
    this.userQuizDetails = [];
    this.showAssessment = false;

    this.apiService.getQuiz().subscribe((res) => {
      try {
        res.data.filter((resObj: any) => {
          if (
            resObj.attributes.level.toLowerCase() === level.toLowerCase() &&
            resObj.attributes.course_name.toLowerCase() ===
              this.courseName.toLowerCase()
          ) {
            this.userQuizDetails.push(resObj);
          }
        });
      } catch (err: any) {
        console.log(err);
      }
    });
    setTimeout(() => {
      this.answersArray = Array(this.userQuizDetails.length).fill('');
    }, 3000);
  }

  public correctAns: number = 0;
  public wrongtAns: number = 0;
  public notAnswered: number = 0;
  private answersArray: string[] = [];
  onChange(question: QuizDetails, option: string, Index: number) {
    this.answersArray[Index] = option;
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

  public successPer: string = '';
  public async SubmitBeginnerAss(data: any): Promise<void> {
    try {
      this.assessmentCutoff = Math.round(this.userQuizDetails.length / 2);
      this.assessmentStatus = '';
      this.correctAns = this.wrongtAns = this.notAnswered = 0;
      for (let i = 0; i < this.answersArray.length; i++) {
        if (
          this.answersArray[i] ===
          data[i]?.attributes?.answers.replace(/"/g, '')
        ) {
          this.correctAns++;
        } else if (!this.answersArray[i]) {
          this.notAnswered++;
        } else {
          this.wrongtAns++;
        }
      }

      this.successPer = (
        (Number(this.correctAns) * 100) /
        Number(this.userQuizDetails.length)
      ).toFixed(1);

      if (this.correctAns >= this.assessmentCutoff) {
        this.assessmentStatus = 'Passed';
      } else {
        this.assessmentStatus = 'Failed';
      }

      this.showAssessment = true;

      await this.scoreStatus(this.correctAns, this.wrongtAns, this.notAnswered);
    } catch (error) {}
  }

  // High Chart data
  chartData: any;
  chartOptions: any;
  public scoreStatus(correct: number, wrong: number, notAns: number): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.chartData = {
      labels: ['Correct Answers', 'Wrong Answers', 'Not Answers'],
      datasets: [
        {
          data: [correct, wrong, notAns],
          backgroundColor: [
            documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--red-500'),
            documentStyle.getPropertyValue('--yellow-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--green-400'),
            documentStyle.getPropertyValue('--red-400'),
            documentStyle.getPropertyValue('--yellow-400'),
          ],
        },
      ],
    };

    this.chartOptions = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
    };
  }

  public replaceQuotes(text: string): string {
    return text.replace(/"/g, '');
  }
}
