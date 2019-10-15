import { Component, OnInit} from '@angular/core';
import { ApiService } from '../core';

@Component({
    selector: 'app-front',
    templateUrl: './front.component.html'    
  })

export class FrontComponent implements OnInit {
    constructor(private ApiService:ApiService){}
    ngOnInit(){
        
    }
      
}

