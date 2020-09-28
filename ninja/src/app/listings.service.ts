import { Injectable } from '@angular/core';

@Injectable()
export class ListingsService {
    listings = [
        { id: 1, name: 'Shoes' },
        { id: 2, name: 'Backpack' }
    ];
    lastId: number;

    constructor() {
        this.lastId = 2;
    }

    getListings() {
        return this.listings;
    }

    getListingById(id: number) {
        return this.listings.find((listing) => listing.id === id);
    }

    addListing(name: string) {
        this.listings.push({
            id: (this.lastId++) + 1,
            name
        });
    }

    removeListing(id: number) {
        this.listings = this.listings.filter((listing) => listing.id !== id);
    }
}