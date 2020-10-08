import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListingsService } from './listings.service';
import { ListingComponent } from './listing/listing.component';
import { FilterPipe } from './filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { PostsComponent } from './posts/posts.component';
import * as fromApp from './store/app.reducer';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

const customComponents = [
  AppComponent, HomeComponent,
  ListingComponent, PostsComponent
];

const pipes = [FilterPipe];

@NgModule({
  declarations: [
    ...customComponents,
    ...pipes,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer)
  ],
  providers: [ListingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
