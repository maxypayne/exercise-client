import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Movie } from './interfaces/movie';
import { User } from './interfaces/user';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Params } from './interfaces/params';

@Injectable({ providedIn: 'root'})
export class AppService {
  url = environment.apiUrl;
  isLog: Subject<boolean> = new Subject<boolean>();
  keys = {
    jwt: 'TOPWFC02GOVZ71CU8',
    jwtTime: 'TIR8ETWFV7QXOFRKE'
  };
  constructor(private http: HttpClient, private router: Router) {}
  getMovies(skip: number): Observable<Array<Movie>> {
    return this.http.post<Array<Movie>>(`${this.url}/movies`, { skip });
  }
  filterMovies(filter: string): Observable<Array<Movie>> {
    return this.http.post<Array<Movie>>(`${this.url}/movies/filter`, { filter });
  }
  addMovie(movie: Movie): Observable<boolean> {
    return this.http.post<boolean>(`${this.url}/movies/add`, movie);
  }
  verifyToken(): Observable<boolean> {
    const token = this.getJwt();
    return token ? this.http.post<boolean>(`${this.url}/users/verifyToken`, { token }) : of(false);
  }
  signup({ email, password }: User) {
    console.log(email, password);
    console.log(this.url +' url');
    return this.http.post<User>(`${this.url}/users/signup`, { email, password });
  }
  login({ email, password }: User) {
    console.log(this.url);

    return this.http.post<User>(`${this.url}/users/login`, { email, password });
  }
  setJwt(jwt: string) {
    localStorage.setItem(this.keys.jwt, jwt);
    localStorage.setItem(this.keys.jwtTime, String(Date.now()));
  }
  getJwt() {
    return localStorage.getItem(this.keys.jwt);
  }
  removeJwt() {
    localStorage.removeItem(this.keys.jwt);
    localStorage.removeItem(this.keys.jwtTime);
  }
  goTo(path: string, params?: Params) {
    if (params) {
      this.router.navigate([path], { queryParams: params }).catch();
    } else {
      this.router.navigate([path]).catch();
    }
  }
  logout() {
    this.removeJwt();
    this.goTo('/login');
  }
}
