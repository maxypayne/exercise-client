import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SpinnerModule } from "../../partials/spinner/spinner.module";

const routes: Routes = [{ path: '', component: SignupComponent }];

@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
  ],
  exports: [
    SignupComponent,
  ]
})
export class SignupModule { }
