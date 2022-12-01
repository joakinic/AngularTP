import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Book, FavouriteItem } from '../interfaces/book';
import { FavouritesService } from './favourites.service';
import { Search } from 'src/app/interfaces/book';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private URL: string = 'http://localhost/web2/tpe2/api/';

  private _books: Book[] = [];
  books: BehaviorSubject<Book[]> = new BehaviorSubject([...this._books]);

  private _favourites: Book[] = [];
  favourites: BehaviorSubject<Book[]> = new BehaviorSubject([...this._favourites]);

  constructor(
    private _http: HttpClient,
    private _favouritesService: FavouritesService
  ) {
    setTimeout(() => {
      this._favouritesService.favourites$.subscribe(
        (favourites) => this.refreshFavourites(favourites)

      )
    }, 500);
  }

  public find(search:Search): void {
    console.log(search);
    let params:HttpParams = new HttpParams()
      .set('title', `%${search.title}%`)
      .set('author', `%${search.author}%`)
      .set('genre', `%${search.genre}%`)
      .set('operator', 'like');
    console.log(params);
    this._http.get<Book[]>(this.URL + 'books/', { params: params })
    .pipe(
      tap((books) => {
        books.forEach((book) => {
          let i = this._favouritesService.findById(book.id!);
          book.favourite = i ? i.favourite : false;
          book.note = i ? i.note : '';
        });
      })
    )
    .subscribe(
      (books) => {
        this._books = books;
        this.books.next([...this._books]);
      }
    )
  }

  private refreshFavourites(favourites: FavouriteItem[]) {
    this._favourites = [];
    favourites.forEach(favourite => {
      let book = this._books.find(book => book.id == favourite.id )
      if (book) {
        [book.favourite, book.note] = [favourite.favourite, book.note]
        if (favourite.favourite) {
          this._favourites.push(book);
        }
      } else {
        if (favourite.favourite) {
          this._http.get<Book>(this.URL + 'books/' + favourite.id)
          .subscribe(
            (book) => {
              [book.favourite, book.note] = [favourite.favourite, book.note];
              if (!this._favourites.find(book => book.id == favourite.id )) {
                this._favourites.push(book);
                this.favourites.next([...this._favourites]);
              }
            }
          )
        }
      }
    });

    this.books.next([...this._books]);
    this.favourites.next([...this._favourites]);
  }
}
