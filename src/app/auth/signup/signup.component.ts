import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
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
  signup() {
    console.log(this.form.value);
    const { email, password } = this.form.value;
    this.app.signup({ email, password}).subscribe((data: any) => {
      if (data) {
        const { message } = data;
        if (message) {
          this.app.goTo('/login');
        }
      }
    });
  }
}
