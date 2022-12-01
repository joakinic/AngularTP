import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './book/list/book-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './common/material/material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FavouritesComponent } from './book/favourites/favourites.component';
import { AboutComponent } from './about/about.component';
import { Error404Component } from './error404/error404.component';
import { FindBooksComponent } from './book/find/find.component';
import { BookInterfaceModule } from './interfaces/book.module';
@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    NavbarComponent,
    FavouritesComponent,
    AboutComponent,
    Error404Component,
    FindBooksComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    BookInterfaceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
