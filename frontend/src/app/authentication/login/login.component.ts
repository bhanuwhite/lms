import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { emailValidator } from 'src/app/email.directive';
import { AuthService } from '../../services/auth.service';
import { Login } from 'src/app/models/authenticate';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { SocialUser } from "@abacritt/angularx-social-login";
import {  GoogleSigninButtonModule,GoogleSigninButtonDirective } from '@abacritt/angularx-social-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService,GoogleSigninButtonModule,GoogleSigninButtonDirective],
})
export class LoginComponent {
  formgroup!: FormGroup;
  role: string;

  body!: Login;
  isLoading: boolean = false;

  isError: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aurhService: AuthService,
    private snakeBar: MatSnackBar,
    private messageService: MessageService,
    private authService: SocialAuthService
  ) {
    this.role = 'user';
  }
  user!:SocialUser;
  loggedIn!:boolean;

  ngOnInit(): void {
    this.formgroup = this.fb.group({
      name: new FormControl('', [Validators.required, emailValidator()]),
      pwd: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(user);

     try{
      if (user.idToken) {
        localStorage.setItem('token', user.idToken);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', 'user');
      this.isLoading = false;
      localStorage.setItem('isAuthenticate', 'true');
      this.router.navigate(['/user']);
      }
     }
     catch (error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went to wrong !!' });
      }

})
  }

  public onSubmit(): void {
    this.body = {
      identifier: this.formgroup.value.name,
      password: this.formgroup.value.pwd,
    };
    console.log(this.body);

    this.isLoading = true;
    this.aurhService.loginUser(this.body).subscribe((res) => {
      localStorage.setItem('token', res.jwt);
      try {
        console.log(res);

        const data = res.user;
        console.log(data);

        localStorage.setItem('user', JSON.stringify(data));
        if (data.role_id === '1') {
          localStorage.setItem('role', 'admin');
          this.isLoading = false;
          localStorage.setItem('isAuthenticate', 'true');
          this.router.navigateByUrl('/admin');
        } else if (data.role_id === '3' ) {
          localStorage.setItem('role', 'user');
          this.isLoading = false;
          localStorage.setItem('isAuthenticate', 'true');
          this.router.navigate(['user']);
        } else {
          this.snakeBar.open('Somthing went to wrong !!', 'Login again', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      } catch (error) {
        console.log('error', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Somthing went to wrong !! ',
        });
      }
    });
  }


  // loginWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
  //     .then((user: SocialUser) => {
  //       // User has signed in successfully
  //       console.log(user);
  //     })
  //     .catch((error: any) => {
  //       // An error occurred
  //       console.log(error);
  //     });
  // }











  public get name() {
    return this.formgroup.get('name')!;
  }

  public get pwd() {
    return this.formgroup.get('pwd')!;
  }
}
