import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';

import { ListingsService } from './listings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  title = 'ninja';
  listingsCount: number;
  private itemSubs: Subscription;
  private userSubs: Subscription;
  constructor(private listingsService: ListingsService, private authService: AuthService) {
  }

  ngOnInit() {
    this.listingsCount = this.listingsService.getListings().length;
    this.itemSubs = this.listingsService.itemAdded.subscribe((data) => {
      this.listingsCount += 1;
    })
    this.userSubs = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    })
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    // Clean up subscription
    this.itemSubs.unsubscribe();
    this.userSubs.unsubscribe();
  }

}
