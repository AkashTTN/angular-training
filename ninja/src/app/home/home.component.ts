import { Component, OnInit } from '@angular/core';

import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listings: { id: number, name: string }[];
  inputListingName: string;
  inputError: boolean = false;

  constructor(private listingsService: ListingsService) {
  }

  ngOnInit(): void {
    this.listings = this.listingsService.getListings();
  }

  onAddItem(): void {
    this.inputError = false;
    if (this.inputListingName.trim().length === 0) {
      this.inputError = true;
      return;
    }
    this.listingsService.addListing(this.inputListingName);
    this.inputListingName = '';
  }

}
