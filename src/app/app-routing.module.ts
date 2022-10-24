import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLogin } from "./tools/checkLogin";

const routes: Routes = [
  { path: 'signup',  loadChildren: () => import('./auth/signup/signup.module').then(m => m.SignupModule) },
  { path: 'login',  loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
  { path: 'movies', canActivate: [CheckLogin],  loadChildren: () => import('./movies/movies.module').then(m => m.MoviesModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
