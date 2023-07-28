import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  Quiz,
  QuizData,
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
  courseName!: string;
  editQuizGroup!: FormGroup;
  public questionBody!: Quiz;
  public quizDetails: QuizResponse[] = [];
  public quizData: QuizResponse[] = [];
  public visible: boolean = false;
  public result: string[] = [];
  public emailFormArray!: FormArray;

  public level: level[] = [
    { level_name: 'beginner' },
    { level_name: 'intermediate' },
    { level_name: 'advanced' },
  ];
  public _id!: number;

  public categories: answers[] = [
    { name: 'A', checked: false },
    { name: 'B', checked: false },
    { name: 'C', checked: false },
    { name: 'D', checked: false },
  ];

  ngOnInit(): void {
    this.getCourseName();
    this.getQuizData();
    this.loadEditForm();
  }

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  public answersFormArray: FormArray = this.fb.array([]);

  // Edit Form validation
  public loadEditForm(): void {
    this.editQuizGroup = this.fb.group({
      Course_Name: new FormControl('', [Validators.required]),
      level: new FormControl('', [Validators.required]),
      question: new FormControl('', [Validators.required]),
      answer: this.fb.array([]),
      option1: new FormControl('', Validators.required),
      option2: new FormControl('', Validators.required),
      option3: new FormControl('', Validators.required),
      option4: new FormControl('', Validators.required),
    });
  }

  getCourseName() {
    this.courseName = localStorage.getItem('CourseName')!;
  }

  public getQuizData() {
    this.quizDetails = [];
    this.apiService.getQuiz().subscribe((res) => {
      this.quizData = res.data;
      console.log(this.quizData);

      this.quizData.map((res: QuizResponse) => {
        if (this.courseName == res.attributes.course_name) {
          this.quizDetails.push(res);
        }
      });
        console.log(this.quizDetails);
    });
  }

  showDialog(question: QuizResponse) {
    this.visible = true;
    this.result = [];
    const checkAnswers = JSON.parse(question.attributes.answers);
    this.result = checkAnswers.trim().split(' ');
    this.categories.map((res) => {
      res.checked = false;
    });

    this.result.forEach((value) => {
      const category = this.categories.find((c) => c.name === value);
      if (category) {
        category.checked = true;
      }
    });
    const levelName = question.attributes.level;
    this._id = question.id;
    this.editQuizGroup = this.fb.group({
      Course_Name: new FormControl(question.attributes.course_name),
      level: new FormControl({ level_name: levelName }),
      question: new FormControl(question.attributes.question),
      option1: new FormControl(question.attributes?.q_options?.a),
      option2: new FormControl(question.attributes?.q_options?.b),
      option3: new FormControl(question.attributes?.q_options?.c),
      option4: new FormControl(question.attributes?.q_options?.d),
      answers: this.fb.array(
        this.categories
          .filter((category) => category.checked)
          .map((category) => new FormControl(category.name))
      ),
    });
  }

  onChange(name: string, selectedOption: EventTarget | null) {
    if (
      selectedOption instanceof HTMLInputElement &&
      selectedOption.checked !== undefined
    ) {
      const checked = selectedOption.checked;
      this.emailFormArray = this.editQuizGroup.controls['answers'] as FormArray;
      if (checked) {
        this.emailFormArray.push(new FormControl(name));
      } else {
        let index = this.emailFormArray.controls.findIndex(
          (x) => x.value == name
        );
        if (index !== -1) {
          this.emailFormArray.removeAt(index);
        }
      }
    }
  }

  onEditQuestion() {
    this.visible = false;
    const answers1 = this.editQuizGroup.value.answers;
    let myString: string = JSON.stringify(answers1.join(' '));
    this.questionBody = {
      data: {
        level: this.editQuizGroup.value.level.level_name,
        question: this.editQuizGroup.value.question,
        answers: myString,
        q_options: {
          a: this.editQuizGroup.value.option1,
          b: this.editQuizGroup.value.option2,
          c: this.editQuizGroup.value.option3,
          d: this.editQuizGroup.value.option4,
        },
        course_name: this.editQuizGroup.value.Course_Name,
      },
    };
    this.apiService.updateQuiz(this._id, this.questionBody).subscribe((res) => {
      try {
        this.getQuizData();
        this.editQuizGroup.reset();
        myString = '';
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Update successfull..',
        });

        location.reload();
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went to wrong',
        });
      }
    });
  }

  editCancel() {
    this.visible = false;
  }

  deleteQuestion(question: QuizResponse) {
    this.confirmationService.confirm({
      message: `Do you want to delete - ${question.attributes.question} `,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.apiService.deleteQuiz(question.id).subscribe((res) => {
          try {
            this.getQuizData();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Deleted sucessfully',
            });
          } catch (error) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Something went to wrong',
            });
          }
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }
}
