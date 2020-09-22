import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() givenName;
  @Output() onShout = new EventEmitter();

  name = '';
  isDisabled = true;
  sampleData = [{ name: 'Akash', belt: 'yellow' }, { name: 'Avinash', belt: 'green' }];
  secret="Black is not a color and we can travel into the future but not in the past.";
  reveal=false;
  switchStatus='ON';
  
  constructor() {
    this.enableAfterTwoSeconds();
  }

  ngOnInit(): void {
  }

  toggleSecret() {
    this.reveal = !this.reveal;
  }

  toggleSwitch() {
    this.switchStatus = (this.switchStatus === 'ON' ? 'OFF' : 'ON');
  }

  getButtonColor() {
    return this.switchStatus === 'ON' ? 'green': 'red';
  }

  fireOnShout() {
    this.onShout.emit(this.givenName);
  }

  enableAfterTwoSeconds() {
    setTimeout(() => this.isDisabled = false, 2000);
  }

}
