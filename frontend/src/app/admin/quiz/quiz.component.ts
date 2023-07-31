import { PropertyWrite } from '@angular/compiler';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SortEvent } from 'primeng/api';

import { Router } from '@angular/router';
import { resolve } from 'chart.js/dist/helpers/helpers.options';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Quiz, QuizResponse, answers, level } from 'src/app/models/quiz';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  styles: [
    `
      :host ::ng-deep button {
        margin-right: 0.25em;
      }
    `,
  ],
  providers: [ConfirmationService, MessageService],
})
export class QuizComponent implements OnInit, OnDestroy {
  @ViewChild('vid') videoPlayer!: ElementRef;
  public isLoading: boolean = false;
  msgs: Message[] = [];
  public addDisplay: boolean = false;
  public editDisplay: boolean = false;
  public addQuizGroup!: FormGroup;
  public editQuizGroup!: FormGroup;
  public course_Name: string = '';
  public allCourses: string[] = [];
  visible: boolean = false;
  public quizBody!: Quiz;
  public elements = document.getElementsByTagName('input');
  public techCourseNames: string[] = [];
  public uniqueTech: string[] = [];
  quizGetSubscription$: Subscription = new Subscription();
  quizPostSubscription$: Subscription = new Subscription();
  quizUpdateSubscription$: Subscription = new Subscription();
  quizDeleteSubscription$: Subscription = new Subscription();
  percentage: number = 0;
  public level: level[] = [
    { level_name: 'beginner' },
    { level_name: 'intermediate' },
    { level_name: 'advanced' },
  ];
  public answersArray: answers[] = [
    { name: 'A', checked: false },
    { name: 'B', checked: false },
    { name: 'C', checked: false },
    { name: 'D', checked: false },
  ];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private apiService: ApiService,
    private route: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getCourseContentDetails();
    this.getQuizData();
    this.loadForm();
  }

  // Add Form validation
  public loadForm(): void {
    this.addQuizGroup = this.fb.group({
      Course_Name: new FormControl(this.course_Name, [Validators.required]),
      level: new FormControl('', [Validators.required]),
      question: new FormControl('', [Validators.required]),
      option1: new FormControl('', Validators.required),
      option2: new FormControl('', Validators.required),
      option3: new FormControl('', Validators.required),
      option4: new FormControl('', Validators.required),
      checkArray: this.fb.array([], Validators.required),
    });
  }

  onChange(name: string, selectedOption: EventTarget | null) {
    if (
      selectedOption instanceof HTMLInputElement &&
      selectedOption.checked !== undefined
    ) {
      const checked = selectedOption.checked;
      const emailFormArray = <FormArray>(
        this.addQuizGroup.controls['checkArray']
      );
      if (checked) {
        emailFormArray.push(new FormControl(name));
      } else {
        let index = emailFormArray.controls.findIndex((x) => x.value == name);
        emailFormArray.removeAt(index);
      }
    }
  }

  onSubmitQuestionDetails() {
    this.visible = false;
    const answers = this.addQuizGroup.value.checkArray;
    const myString: string = JSON.stringify(answers.join(' '));
    this.quizBody = {
      data: {
        level: this.addQuizGroup.value.level.level_name,
        question: this.addQuizGroup.value.question,
        answers: myString,
        q_options: {
          a: this.addQuizGroup.value.option1,
          b: this.addQuizGroup.value.option2,
          c: this.addQuizGroup.value.option3,
          d: this.addQuizGroup.value.option4,
        },
        course_name: this.addQuizGroup.value.Course_Name,
      },
    };

    this.apiService.postQuiz(this.quizBody).subscribe((res) => {
      try {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Question Added',
        });
        this.getCourseContentDetails();
        this.getQuizData();
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went to wrong',
        });
      }
    });
    for (let i = 0; i < this.elements.length; i++) {
      if (this.elements[i].type == 'checkbox') {
        this.elements[i].checked = false;
      }
    }
  }

  public getCourseContentDetails() {
    this.apiService.getContent().subscribe((res) => {
      const courses = res.data;
      courses.forEach((item) => {
        this.allCourses.push(item.attributes?.technologies);
        this.allCourses.forEach((obj) => {
          const values = Object.values(obj);
          values.forEach((value) => {
            if (!this.uniqueTech.includes(value)) {
              this.uniqueTech.push(value);
            }
          });
        });
      });
    });
  }

  public getQuizData() {
    this.apiService.getQuiz().subscribe((res) => {
      this.techCourseNames = res.data.map((res) => {
        return res.attributes.course_name.toLocaleLowerCase();
      });
      this.techCourseNames = Array.from(new Set(this.techCourseNames));
    });
  }
  showDialog(course: string) {
    this.visible = true;
    this.course_Name = course;
    this.loadForm();
  }
  addCancel() {
    this.visible = false;
  }

  showQuizQuestions(technology: string) {
    this.route.navigate(['/quiz/', technology]);
    localStorage.setItem('CourseName', technology);
  }

  public deleteExam(quiz: string): void {
    this.confirmationService.confirm({
      message: `Are you want to delete ${quiz} Assessments ?`,
      header: 'Confirmation..',
      accept: () => {
        try {
          this.apiService.getQuiz().subscribe((res) => {
            res.data.map((res: QuizResponse) => {
              if (
                quiz.toLowerCase() === res.attributes.course_name.toLowerCase()
              ) {
                this.apiService.deleteQuiz(res.id).subscribe((res) => {
                  this.getCourseContentDetails();
                  this.getQuizData();
                });
              }
            });
          });
        } catch (err: any) {
          console.warn(err);
        }
        this.messageService.add({
          severity: 'success',
          life: 3000,
          summary: `${quiz} Assessments deleted.`,
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: ' Request denied.',
        });
      },
    });
  }

  ngOnDestroy(): void {}
}
