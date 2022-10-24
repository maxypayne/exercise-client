import { Component } from '@angular/core';
import { AppService } from "./app.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  $isLog: Subscription;
  isLog = false;
  constructor(private app: AppService) {
    this.$isLog = this.app.isLog.subscribe((isLog: boolean) => {
      this.isLog = isLog;
    });
  }
  handleLink(id: string): void {
    if (id === 'logout') {
      this.app.logout();
      this.isLog = false;
    } else {
      this.app.goTo(`/${id}`);
    }
  }
}
