import { Component } from '@angular/core';
import { UserService, ApiService } from './modules/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'My Angular Project';
  constructor ( 
  ) {}

  ngOnInit() {
  }
}


