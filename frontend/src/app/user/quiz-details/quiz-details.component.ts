import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription, interval } from 'rxjs';
import { QuizDetails } from 'src/app/models/quiz';
import { AboutService } from 'src/app/services/about.service';
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
  public assessmentLevel: string = '';
  public assessmentCutoff: number = 0;
  public headerName: string = '';
  public correctAns: number = 0;
  public wrongtAns: number = 0;
  public notAnswered: number = 0;
  public answersArray: string[] = [];

  targetTime!: Date;
  targetTimes!: Date;
  countdown!: string;
  private timerSubscription: Subscription = new Subscription();
  public ass_submit_time!: Date;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private aboutServ: AboutService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getTechName();

    this.getUserLevel('beginner')
      .then(() => {
        this.assessmentTime();
      })
      .catch((err) => {
        console.log( err);
      });
  }

  private assessmentTime() {
    this.targetTime = new Date();

    //  below  lines for 2 weeks.
    this.targetTime.setDate(this.targetTime.getDate() + 14);

    //  below lines for for hours.
    // this.targetTime = new Date(  this.ass_submit_time.getTime() + 2 * 60 * 60 * 1000);

    // below lines for minutes.
    // this.targetTime = new Date(this.ass_submit_time.getTime() + 2 * 60 * 1000);

    this.timerSubscription = interval(1000).subscribe(() => {
      this.updateCountdown();
    });
  }

  public days !: number
  public hours !: number
  public minutes !: number
  public seconds !: number

  updateCountdown() {
    const currentTime = new Date();
    const timeDifference = this.targetTime.getTime() - currentTime.getTime();

    if (timeDifference <= 0) {
      this.countdown = 'Assessment is now available!';
      this.apiService.getQuiz().subscribe((res) => {
        res.data.map((resObj: any) => {
          if (
            this.courseName.toLowerCase() ===
            resObj.attributes.course_name.toLowerCase()
          ) {
            const putAssessmentStatus = {
              data: {
                status: false,
              },
            };
            this.apiService
              .updateQuiz(resObj.id, putAssessmentStatus)
              .subscribe((res) => {
                this.getUserLevel(this.headerName);
                this.timerSubscription.unsubscribe();
              });
          } else
            (err: any) => {
              console.log(err);
            };
        });
      });
    } else {
      // below lines for show in days
      this.days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      this.hours = Math.floor( (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)   );
      this.minutes = Math.floor( (timeDifference % (1000 * 60 * 60)) / (1000 * 60)  );
      this.seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      this.countdown = `${this.days}d ${this.hours}hr ${this.minutes}m ${this.seconds}s`;

      // below lines for show in days
      // this.hours = Math.floor( (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)   );
      // this.minutes = Math.floor( (timeDifference % (1000 * 60 * 60)) / (1000 * 60)  );
      // this.seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      // this.countdown = ` ${this.hours}hr ${this.minutes}m ${this.seconds}s`;

      // below lines for show in days
      // this.minutes = Math.floor( (timeDifference % (1000 * 60 * 60)) / (1000 * 60)  );
      // this.seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      // this.countdown = `${this.minutes}m ${this.seconds}s`;
    }
  }

  public getTechName(): void {
    this.route.params.subscribe((res) => {
      this.courseName = res['course'];
    });
  }

  public getUserLevel(level: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.headerName = level;
      this.userQuizDetails = [];
      this.answersArray = [];
      this.showAssessment = false;

      this.apiService.getQuiz().subscribe((res) => {
        try {
          res.data.filter((resObj: any) => {
            if (
              this.headerName.toLowerCase() ===
                resObj.attributes.level.toLowerCase() &&
              this.courseName.toLowerCase() ===
                resObj.attributes.course_name.toLowerCase()
            ) {
              this.userQuizDetails.push(resObj);
            }
          });

          this.ass_submit_time = new Date(
            this.userQuizDetails[0]?.attributes.updatedAt
          );
          for (let i = 0; i < this.userQuizDetails.length; i++) {
            this.answersArray[i] = '';
          }

          resolve();
        } catch (err: any) {
          console.log(err);
          reject(err);
        }
      });
    });
  }

  onChange(question: QuizDetails, option: string, Index: number) {
    this.answersArray[Index] = option;
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

      if (this.assessmentStatus.toLowerCase() === 'failed') {
        this.apiService.getQuiz().subscribe((res) => {
          res.data.map((resObj: any) => {
            if (
              this.courseName.toLowerCase() ===
                resObj.attributes.course_name.toLowerCase() &&
              this.headerName.toLowerCase() ===
                resObj.attributes.level.toLowerCase()
            ) {
              const putAssessmentStatus = {
                data: {
                  status: true,
                },
              };
              this.apiService
                .updateQuiz(resObj.id, putAssessmentStatus)
                .subscribe((res) => {
                  this.messageService.add({
                    detail: 'Status updated to True',
                    severity: 'success',
                  });
                });
              this.assessmentTime();
            } else
              (err: any) => {
                console.log(err);
              };
          });
        });
      }
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

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
