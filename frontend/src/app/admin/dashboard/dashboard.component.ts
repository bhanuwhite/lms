import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  basicData: any;
  overViewMenu: any;

  public schedule = [ "Weekly","Monthly", "Quarterly"]
  visibleSidebar1: boolean = true;
  ngOnInit(): void {
    this.overViewMenus();
    this.chatData();
  }

  chat: any[] = [65, 59, 80, 81, 56, 80, 80]
  /**
   * chatData
   */
  public chatData(): void {
    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: this.chat,
          fill: false,
          borderColor: '#42A5F5',
          tension: .4
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#FFA726',
          tension: .4
        }
      ]
    };
  }

  public onEvent(data: any) {
    console.log(data);
  }

  public overViewMenus(): void {
    this.overViewMenu = [{
      items: [
        {
          label: 'Monthly',
        },
        {
          label: 'Weekly',
        }
      ]
    }]
  }


  public close(): void {
    this.visibleSidebar1 = false;
  }

}
