import { Component, Input } from '@angular/core';

import { Errors } from '../core';

@Component({
  selector: 'app-list-errors',
  template: `
  <ul class="error-messages" *ngIf="errorList">
    <li *ngFor="let error of errorList">
      {{ error }}
    </li>
  </ul>
  `
})
export class ListErrorsComponent {
  formattedErrors: Array<string> = [];

  @Input()
  set errors(errorList: Errors) {
    this.formattedErrors = Object.keys(errorList.errors || {})
      .map(key => `${key} ${errorList.errors[key]}`);
  }

  get errorList() { return this.formattedErrors; }


}
