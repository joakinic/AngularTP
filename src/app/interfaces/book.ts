export interface Author {
  id?:number;
  author:string;
  note?:string;
}

export interface Genre {
  id?:number;
  genre:string;
  note?:string;
}

export interface Book {
  id?:number;
  isbn:string;
  title:string;
  price:number|string;
  url_cover:string;
  id_author:number;
  id_genre:number;
  author?:string;
  genre?:string;

  favourite?:boolean;
  note?:string;
}

export interface FavouriteItem {
    id: number,
    favourite: boolean,
    note: string;
}

export interface Search {
  title: string,
  author: string,
  genre: string
}
