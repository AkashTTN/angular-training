import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  listing: { name: string, id: number };
  listingId: number;

  constructor(
    private listingsService: ListingsService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.listingId = +this.route.snapshot.params['id'];
    this.listing = this.listingsService.getListingById(this.listingId);

    this.route.params.subscribe((params: Params) => {
      this.listingId = +params['id'];
      this.listing = this.listingsService.getListingById(this.listingId);
    })
  }


}
