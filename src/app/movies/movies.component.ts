import { Component, HostListener, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Movie } from '../interfaces/movie';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { delay } from "rxjs";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  form: FormGroup;
  movie: Movie | undefined | null = { primaryTitle: '', id: '', startYear: '', originalTitle: '' };
  skip = 1;
  isPopupOpen = false;
  showMovie = false;
  newMovie = false;
  waitAddMovie = false;
  searchControl = new FormControl();
  timeOutId: any;
  errMessage: string = '';
  message: string | null = null;
  constructor(private app: AppService) {
    this.form = new FormGroup({
      originalTitle: new FormControl(null, [Validators.required]),
      primaryTitle: new FormControl(null, [Validators.required]),
      startYear: new FormControl(null, [Validators.required]),
    });
  }
  @HostListener("click", ["$event"])
  public onClick(event: any): void {
    event.stopPropagation();
  }
  ngOnInit(): void {
    this.getMovies();
  }
  handleSearch(e: any) {
    if (e?.target?.value) {
      clearTimeout(this.timeOutId);
      this.timeOutId = setTimeout(() => {
        // this.app.filterMovies(e.target.value).subscribe((movies: Array<Movie>) => {
        //   this.movies = movies;
        // });
        this.app.filterMovies(e.target.value).subscribe({
          next: (movies: Array<Movie>) => { this.movies = movies},
          error: (err) => {
            console.log(err);
          }
        })
      }, 100);
    } else if (!this.movies.length) {
      this.getMovies();
    }
  }
  getMovies(): void {
    this.app.getMovies(this.skip).subscribe((movies: Array<Movie>) => {

    });
    this.app.getMovies(this.skip).subscribe({
      next: (movies: Array<Movie>) => { this.movies.push(...movies) },
      error: (err) => { console.log(err) },
    });
    this.skip += 1;
  }
  selectMovie(id: string): void {
    this.isPopupOpen = true;
    this.showMovie = true;
    this.movie = this.movies.find((movie: Movie) => movie.id === id);
  }
  addNewMovie() {
    this.isPopupOpen = true;
    this.newMovie = true;
  }
  closePopup(event: any) {
    if (event?.target && ['popup-wrapper', 'icon-cross'].includes(event.target.className)) {
      this.isPopupOpen = false;
      this.movie = null;
      this.showMovie = false;
      this.newMovie = false;
      this.message = null;
      this.form.reset();
    }
  }
  sortByYear() {
    this.movies = this.movies.sort(( a: Movie, b: Movie ) => {
      if ( a.startYear < b.startYear ) return -1;
      if ( a.startYear > b.startYear ) return 1;
      return 0;
    });
  }
  addMovie() {
    const movie: Movie = this.form.value;
    this.waitAddMovie = true;
    this.app.addMovie(movie).pipe(delay(2000)).subscribe((added: boolean) => {
      if (added) {
        this.form.reset();
        this.message = 'Movie added';
      } else {
        console.log('ds');
      }
      this.waitAddMovie = false;
    });
  }
}
