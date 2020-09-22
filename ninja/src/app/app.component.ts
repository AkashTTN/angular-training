import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ninja';
  givenName='homly child';

  shout(givenName) {
    alert(`${givenName} is shouting.`);
  }

}
