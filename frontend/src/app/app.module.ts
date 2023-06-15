import { forwardRef, NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {DialogModule} from 'primeng/dialog';
import {TooltipModule} from 'primeng/tooltip';
import {ButtonModule} from 'primeng/button';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token-interceptor.service';
import { EmailDirective } from './email.directive';
import { AuthService } from './services/auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserGuard } from 'src/guards/user.guard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SheredModule } from './component/shered.module';
import {MatTabsModule} from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserModule } from './user/user.module';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {GoogleLoginProvider} from '@abacritt/angularx-social-login';
// import { NgModule } from '@angular/core';
// import { AslGoogleSigninButtonModule } from '../app/authentication/login/login.component';
import {  GoogleSigninButtonModule,GoogleSigninButtonDirective } from '@abacritt/angularx-social-login';

// import {
//   SocialLoginModule,
//   SocialAuthServiceConfig,
//   GoogleLoginProvider,
//   GoogleSigninButtonDirective,
//   GoogleSigninButtonModule,
// } from '@abacritt/angularx-social-login';

let module = [
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatSelectModule,
  ReactiveFormsModule,
  FormsModule,
  SheredModule,
  UserModule,
  forwardRef(() => MatSnackBarModule),
  MatTabsModule,
  ToastModule,

]

@NgModule({
  declarations: [
    AppComponent,
    EmailDirective,
  ],
  imports: [
    ...module,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    SheredModule,
    SocialLoginModule,
    GoogleSigninButtonModule,

    ],

    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AuthService,AuthGuard,UserGuard,

      {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '235488694710-e2fe7teii6rsvf755otpk13r4k8t5fph.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },

    MessageService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
