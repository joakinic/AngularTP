import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Book } from '../../interfaces/book.module';
import { FavouritesService } from '../../services/favourites.service';

@Component({
  selector: 'app-list-books',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent  {
  displayedColumns: string[] = [
    'cover',
    'title',
    'author',
    'genre',
    'price',
    'actions',
  ];

  @Input() books: Book[] = [];

  constructor(private _favouritesService: FavouritesService) {}

  toggleFavorite(id: number): void {
    this._favouritesService.toggleFavourite(id);
  }
}
