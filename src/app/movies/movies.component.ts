import { Component, HostListener, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Movie } from '../interfaces/movie';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Array<Movie> = [];
  form: FormGroup;
  movie: Movie | undefined | null = { primaryTitle: '', id: '', startYear: '', originalTitle: '' };
  skip = 1;
  isPopupOpen = false;
  showMovie = false;
  newMovie = false;
  searchControl = new FormControl();
  timeOutId: any;
  errMessage: string = '';
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
    console.log(e?.target?.value);
    if (e?.target?.value) {
      clearTimeout(this.timeOutId);
      this.timeOutId = setTimeout(() => {
        this.app.filterMovies(e.target.value).subscribe((movies: Array<Movie>) => {
          this.movies = movies;
        });
      }, 100);
    } else if (!this.movies.length) {
      this.getMovies();
    }
  }
  getMovies(): void {
    this.app.getMovies(this.skip).subscribe((movies: Array<Movie>) => {
      this.movies.push(...movies)
    })
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
    console.log('here')
  }
  closePopup(event: any) {
    if (event?.target && ['popup-wrapper', 'close-popup'].includes(event.target.className)) {
      this.isPopupOpen = false;
      this.movie = null;
      this.showMovie = false;
      this.newMovie = false;
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
    this.app.addMovie(movie).subscribe((added: boolean) => {
      if (added) {
        console.log(added)
        // todo add to list
      } else {
        console.log('ds')
      }
    });
  }
}
