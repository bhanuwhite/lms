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
import { Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Quiz, answers, level } from 'src/app/models/quiz';
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
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getCourseContentDetails();
    this.loadForm();
    this.getQuizData();
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
      checkArray: this.fb.array([],Validators.required),
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

  public elements = document.getElementsByTagName('input');

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
      const uniqueTechnology = new Set<string>();
      courses.forEach((item) => {
        uniqueTechnology.add(item.attributes.technology);
      });
      this.allCourses = Array.from(uniqueTechnology);
      console.log(this.allCourses);

    });
  }

  public getQuizData() {
    this.apiService.getQuiz().subscribe((res) => {});
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

  ngOnDestroy(): void {}
}
