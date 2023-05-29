import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Quiz, QuizData, QuizResponse } from 'src/app/models/quiz';
import { ApiService } from 'src/app/services/api.service';
import { QuizComponent } from '../quiz/quiz.component';


interface level {
  level_name: string;
}

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.scss']
})
export class QuizDetailsComponent implements OnInit {

courseName !:string;
editQuizGroup !:FormGroup;
public questionBody !:Quiz;
 public quizDetails :QuizResponse[]=[];

public level: level[] = [
  { level_name: 'beginner'},
  { level_name: 'intermediate' },
  { level_name: 'advanced'}
];
  public _id!: number;


  ngOnInit(): void {
   this.getCourseName();
   this.getQuizData();
   this.loadEditForm();
  }

  constructor(  private apiService: ApiService, private fb: FormBuilder,
     private confirmationService: ConfirmationService,
     private messageService: MessageService){}

   // Edit Form validation
   public loadEditForm(): void {
    this.editQuizGroup = this.fb.group({
      Course_Name: new FormControl('', [Validators.required]),
      level: new FormControl('', [Validators.required]),
      question: new FormControl('', [Validators.required]),
      answer: new FormControl('', [Validators.required]),
      option1: new FormControl('', Validators.required),
      option2: new FormControl('', Validators.required),
      option3: new FormControl('', Validators.required),
      option4: new FormControl('', Validators.required),
    })
  }

  getCourseName(){

   this.courseName = localStorage.getItem('CourseName')!
  }


public quizData :QuizResponse[]=[]

  public getQuizData(){

    this.quizDetails=[]

    this.apiService.getQuiz().subscribe((res)=>{
      this.quizData = res.data;
      this.quizData.map((res:QuizResponse)=>{
        if(this.courseName == res.attributes.course_name){
           this.quizDetails.push(res);
           console.log(this.quizDetails);
        }

      })

    })
  }
  visible : boolean =false;

  showDialog(question:QuizResponse) {

   const levelName=question.attributes.level;
    this._id = question.id;
      console.log(question);

      this.editQuizGroup = this.fb.group({
      Course_Name: new FormControl( question.attributes.course_name, [Validators.required]),
      level: new FormControl(  { level_name: levelName}, [Validators.required]),
      question: new FormControl( question.attributes.question, [Validators.required]),
      answer: new FormControl(question.attributes.answer , [Validators.required]),
      option1: new FormControl(question.attributes?.q_options?.a, Validators.required),
      option2: new FormControl(question.attributes?.q_options?.b , Validators.required),
      option3: new FormControl(question.attributes?.q_options?.c, Validators.required),
      option4: new FormControl( question.attributes?.q_options?.d, Validators.required),
    })
    console.log(this.editQuizGroup.value);
    this.visible = true;
}

onEditQuestion(){
  console.log("update functionlity....");
  this.visible = false;
console.log(this.editQuizGroup.value);

this.questionBody = {
  "data": {
    "level": this.editQuizGroup.value.level.level_name,
      "question":this.editQuizGroup.value.question,
      "answers": this.editQuizGroup.value.answer,
    "q_options": {
      "a": this.editQuizGroup.value.option1,
      "b": this.editQuizGroup.value.option2,
      "c": this.editQuizGroup.value.option3,
      "d": this.editQuizGroup.value.option4
    },
     "course_name":this.editQuizGroup.value.Course_Name
  }
}
console.log(this.questionBody);

this.apiService.updateQuiz(this._id ,this.questionBody).subscribe((res)=>{
  console.log(res);

  try {
    this.getQuizData();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'data Edited...' });
} catch (error) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went to wrong' });
  }
})


}

editCancel(){
  this.visible = false;
}

deleteQuestion(question:QuizResponse){
console.log(question);
// this.apiService.deleteQuiz();

this.confirmationService.confirm({
  message: `Do you want to delete - ${question.attributes.question} ?`,
  header: 'Delete Confirmation',
  icon: 'pi pi-info-circle',
  accept: () => {
    this.apiService.deleteQuiz(question.id).subscribe(res => {
      try {
        this.getQuizData();
        this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Deleted sucessfully' });
      } catch (error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went to wrong' });
      }
    })
  },
  reject: () => {
    this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected' });
  }

})

    }
  }
