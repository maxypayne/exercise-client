import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './movies.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [{ path: '', component: MoviesComponent }];

@NgModule({
  declarations: [
    MoviesComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonModule,
  ],
  exports:[
    MoviesComponent
  ]
})
export class MoviesModule { }
