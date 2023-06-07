import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import {  AllCourseContentData } from 'src/app/models/content';
import { Quiz, QuizData, QuizResponse } from 'src/app/models/quiz';
import { ApiService } from 'src/app/services/api.service';


interface level {
  level_name: string;
}
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  styles: [`
        :host ::ng-deep button {
            margin-right: .25em;
        }
  `],
  providers: [ConfirmationService, MessageService]
})
export class QuizComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('vid') videoPlayer!: ElementRef;

  isLoading: boolean = false;
  msgs: Message[] = [];
  addDisplay: boolean = false;
  editDisplay: boolean = false;

  addQuizGroup!: FormGroup;
  editQuizGroup!: FormGroup;
  course_Name: string = ''

  public allCourses: AllCourseContentData[] = [];
  public quizBody!: Quiz;

  quizGetSubscription$: Subscription = new Subscription();;
  quizPostSubscription$: Subscription = new Subscription();
  quizUpdateSubscription$: Subscription = new Subscription();
  quizDeleteSubscription$: Subscription = new Subscription();
  percentage: number = 0;

  public level: level[] = [
    { level_name: 'beginner' },
    { level_name: 'intermediate' },
    { level_name: 'advanced' }
  ];
  // selectedCategories: any[] = [];

  categories: any[] = [
    { name: 'A', key: 'a', checked: false },
    { name: 'B', key: 'b', checked: false },
    { name: 'C', key: 'c', checked: false },
    { name: 'D', key: 'd', checked: false }
  ];




  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private apiService: ApiService,
    private route: Router
  ) { }


  ngAfterViewInit(): void {
    // this.videoPlayer.nativeElement.addEventListener('timeupdate', (event: any) => {
    //   this.trackVideoProgress(event);
    // });
  }

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
      checkArray: this.fb.array([])
    })
  }

  public emailFormArray: any[]=[];

  // this.emailFormArray.push(name);
  // console.log(this.emailFormArray);

  onChange(name: string, isChecked: any) {

    console.log(isChecked.checked);

    const emailFormArray = <FormArray>this.addQuizGroup.controls['checkArray'];

    if (isChecked.checked) {
      emailFormArray.push(new FormControl(name));
      console.log(emailFormArray);

    } else {
      let index = emailFormArray.controls.findIndex((x) => x.value == name)
      emailFormArray.removeAt(index);
    }


  }


  public elements = document.getElementsByTagName('input');

  onSubmitQuestionDetails() {

    this.visible = false;
    console.log(this.addQuizGroup.value);

    const answers1 = this.addQuizGroup.value.checkArray;
    const myString: string = JSON.stringify(answers1.join(' '));
    console.log(myString);


    this.quizBody = {
      "data": {
        "level": this.addQuizGroup.value.level.level_name,
        "question": this.addQuizGroup.value.question,
        "answers": myString,
        "q_options": {
          "a": this.addQuizGroup.value.option1,
          "b": this.addQuizGroup.value.option2,
          "c": this.addQuizGroup.value.option3,
          "d": this.addQuizGroup.value.option4
        },
        "course_name": this.addQuizGroup.value.Course_Name
      }
    }
    console.log(this.quizBody);

    this.apiService.postQuiz(this.quizBody).subscribe((res) => {
      console.log(res);
      try {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Question Added' });
      } catch (error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went to wrong' });
      }
    })

    for (let i = 0; i < this.elements.length; i++) {
      if (this.elements[i].type == 'checkbox') {
        this.elements[i].checked = false;
      }
    }
    this.emailFormArray=[]
  }





  public getCourseContentDetails() {
    this.apiService.getContent().subscribe((res) => {
      this.allCourses = res.data;
      console.log(res.data);

    })
  }

  public getQuizData() {

    this.apiService.getQuiz().subscribe((res) => {
      console.log(res.data);

    })
  }

  visible!: boolean;

  showDialog(course: AllCourseContentData) {
    this.visible = true;
    this.course_Name = course.attributes.name;
    this.loadForm();
  }







  addCancel() {

    this.visible = false;
  }

  showQuizQuestions(course: string) {

    this.route.navigate(['/quiz/', course])
    localStorage.setItem('CourseName', course)
  }



  ngOnDestroy(): void {
    // this.quizGetSubscription$.unsubscribe();
    // this.quizPostSubscription$.unsubscribe();
    // this.quizUpdateSubscription$.unsubscribe();
    // this.quizDeleteSubscription$.unsubscribe();
  }



}









 // trackVideoProgress(event: any) {
  //   const video = event.target;
  //   const duartionPercentage = (video.currentTime / video.duration) * 100;
  //   // console.log(duartionPercentage);
  //   this.percentage = Math.round(duartionPercentage);
  //   console.log(`Video progress: ${this.percentage}%`);
  // }

  // ngOnInit(): void {
  //   this.loadForm();
  //   this.loadEditForm();
  //   this.getQuiz();


  //   // if ((typeof this.quizData.meta?.pagination?.total !== 'undefined') && (typeof this.quizData.meta?.pagination?.pageSize !== 'undefined')) {
  //   //   this.total = this.quizData.meta?.pagination?.total;
  //   //   this.pagesize = this.quizData.meta?.pagination?.pageSize;


  //   // }
  // }
  // // ngAfterViewInit() {

  // // }




  // /**
  //  * getQiz
  //  */
  // public getQuiz(): void {
  //   this.isLoading = true;
  //   this.quizGetSubscription$ = this.apiService.getQuiz().subscribe(res => {
  //     this.isLoading = false;
  //     try {
  //       this.isLoading = false;
  //       this.quizData = res;
  //       console.log(this.quizData);
  //     } catch (error) {
  //       console.log(error);
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Somrthing went to wrong !!' });
  //       this.isLoading = false;
  //     }

  //   });
  //   // this.isLoading = false;
  // }



  // // Add Form validation
  // public loadForm(): void {
  //   this.addQuizGroup = this.fb.group({
  //     syllabus: new FormControl('', [Validators.required]),
  //     question: new FormControl('', [Validators.required]),
  //     answer: new FormControl('', [Validators.required]),
  //     option1: new FormControl('', Validators.required),
  //     option2: new FormControl('', Validators.required),
  //     option3: new FormControl('', Validators.required),
  //     option4: new FormControl('', Validators.required),
  //   })
  // }

  // // Edit Form validation
  // public loadEditForm(): void {
  //   this.editQuizGroup = this.fb.group({
  //     syllabus: new FormControl('', [Validators.required]),
  //     question: new FormControl('', [Validators.required]),
  //     answer: new FormControl('', [Validators.required]),
  //     option1: new FormControl('', Validators.required),
  //     option2: new FormControl('', Validators.required),
  //     option3: new FormControl('', Validators.required),
  //     option4: new FormControl('', Validators.required),
  //   })
  // }

  // // Open add dialog
  // public addDialog(): void {
  //   this.addDisplay = true;
  // }
  // // Close add dialog
  // public addCancel(): void {
  //   this.addDisplay = false;
  //   this.addQuizGroup.reset();
  // }


  // public onSubmitQuestion(): void {
  //   this.addDisplay = false;
  //   console.log(this.addQuizGroup.value);

  //   this.quizBody = {
  //     "data": {
  //       "all_answer": {
  //         "A": this.addQuizGroup.value.option1,
  //         "B": this.addQuizGroup.value.option2,
  //         "C": this.addQuizGroup.value.option3,
  //         "D": this.addQuizGroup.value.option4
  //       },
  //       "syllabus": this.addQuizGroup.value.syllabus,
  //       "question": this.addQuizGroup.value.question,
  //       "correct_answer": this.addQuizGroup.value.answer
  //     }
  //   }

  //   // this.quizBody.data.all_answer.A = this.addQuizGroup.value.option1;
  //   // this.quizBody.data.all_answer.B = this.addQuizGroup.value.option2;
  //   // this.quizBody.data.all_answer.C = this.addQuizGroup.value.option3;
  //   // this.quizBody.data.all_answer.D = this.addQuizGroup.value.option4;
  //   // this.quizBody.data.syllabus = this.addQuizGroup.value.syllabus;
  //   // this.quizBody.data.question = this.addQuizGroup.value.question;
  //   // this.quizBody.data.correct_answer = this.addQuizGroup.value.answer;

  //   this.quizPostSubscription$ = this.apiService.postQuiz(this.quizBody).subscribe(res => {
  //     try {
  //       console.log('quiz response', res);
  //       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Question added sucessfully ' });
  //       this.getQuiz();
  //     } catch (error) {
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went to wrong !!' })
  //     }
  //     this.addQuizGroup.reset();
  //   });
  // }



  // // open edit form and validation
  // public editDialog(item: QuizResponse): void {
  //   this._id = item.id;
  //   console.log(item);
  //   this.editQuizGroup = this.fb.group({
  //     syllabus: new FormControl(item.attributes?.syllabus, [Validators.required]),
  //     question: new FormControl(item.attributes?.question, [Validators.required]),
  //     answer: new FormControl(item.attributes?.correct_answer, [Validators.required]),
  //     option1: new FormControl(item.attributes?.all_answer?.A, Validators.required),
  //     option2: new FormControl(item.attributes?.all_answer?.B, Validators.required),
  //     option3: new FormControl(item.attributes?.all_answer?.C, Validators.required),
  //     option4: new FormControl(item.attributes?.all_answer?.D, Validators.required),
  //   })
  //   this.editDisplay = true;
  // }

  // // close edit form
  // public editCancel(): void {
  //   this.editDisplay = false;
  // }

  // public onEditQuestion(): void {
  //   this.editDisplay = false;
  //   console.log(this.editQuizGroup.value);

  //   this.quizUpdateBody = {
  //     "data": {
  //       "all_answer": {
  //         "A": this.editQuizGroup.value.option1,
  //         "B": this.editQuizGroup.value.option2,
  //         "C": this.editQuizGroup.value.option3,
  //         "D": this.editQuizGroup.value.option4
  //       },
  //       "syllabus": this.editQuizGroup.value.syllabus,
  //       "question": this.editQuizGroup.value.question,
  //       "correct_answer": this.editQuizGroup.value.answer
  //     }
  //   }
  //   this.apiService.updateQuiz(this._id, this.quizUpdateBody).subscribe(res => {
  //     try {
  //       console.log(res);
  //       this.messageService.add({ severity: 'info', summary: 'Update', detail: ' Updated sucessfully' });
  //       this.getQuiz();
  //     } catch (error) {
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went to wrong !!' })
  //     }
  //   });

  // }

  // // open delete dialog
  // public deleteDialog(data: QuizResponse): void {
  //   console.log(data);

  //   this.confirmationService.confirm({
  //     message: `Do you want to delete - ${data?.attributes?.question} ?`,
  //     header: 'Delete Confirmation',
  //     icon: 'pi pi-info-circle',
  //     accept: () => {
  //       this.apiService.deleteQuiz(data.id).subscribe(res => {
  //         try {
  //           this.getQuiz();
  //           this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Deleted sucessfully' });
  //         } catch (error) {
  //           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went to wrong' });
  //         }
  //       })
  //     },
  //     reject: () => {
  //       // this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
  //     }
  //   });
  // }
