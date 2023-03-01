import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [MessageService]
})
export class UserComponent {


}