import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Accessing form using ViewChild instead of passing it in through the 
  // function 
  @ViewChild('templateForm') templateForm: NgForm;

  listings: { id: number, name: string }[];
  inputListingName: string;
  inputError: boolean = false;
  reactiveForm: FormGroup;

  constructor(private listingsService: ListingsService) {
  }

  ngOnInit(): void {
    this.listings = this.listingsService.getListings();
    this.reactiveForm = new FormGroup({
      companyDetails: new FormGroup({
        name: new FormControl('TTN', Validators.required),
        sector: new FormControl(null, Validators.required)
      }),
      competency: new FormControl(null, [Validators.required]),
      iceCreamFlavor: new FormControl('Strawberry Chocolate', Validators.required)
    })
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

  onSubmitTemplateForm() {
    alert('Template Form Submitted. Check logs.');
    console.log('Template Form', this.templateForm.value);
    this.templateForm.reset();
  }

  onSubmitReactiveForm() {
    alert('Reactive Form Submitted. Check logs.');
    console.log('Reactive Form', this.reactiveForm.value);
    this.reactiveForm.reset();
  }

  emptyStringValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value.trim().length === 0) {
      return { 'emptyString': true }
    }
    return null;
  }

}
