import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ListingsService } from './listings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ninja';
  listingsCount: number;
  private itemSubs: Subscription;

  constructor(private listingsService: ListingsService) {
  }

  ngOnInit() {
    this.listingsCount = this.listingsService.getListings().length;
    this.itemSubs = this.listingsService.itemAdded.subscribe((data) => {
      this.listingsCount += 1;
    })
  }

  ngOnDestroy() {
    // Clean up subscription
    this.itemSubs.unsubscribe();
  }

}
