import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errMessage: string | null = '';
  isPending: boolean = false;
  constructor(private app: AppService) {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
      password: new FormControl(null, [Validators.required]),
    });
  }
  ngOnInit(): void {}
  login() {
    console.log(this.form.value);
    const { email, password } = this.form.value;
    this.isPending = true;
    this.app.login({ email, password}).subscribe((data: any) => {
      if (data) {
        this.isPending = false;
        const { jwt, errMessage } = data;
        if (errMessage) {
          this.errMessage = errMessage;
        } else {
          this.errMessage = null;
          this.app.setJwt(jwt);
          this.app.goTo('/movies');
        }
      }
    });
  }
}
