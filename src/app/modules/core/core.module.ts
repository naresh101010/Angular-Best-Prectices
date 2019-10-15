import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor, ErrorInterceptor } from './interceptors';
import { ErrorComponent } from '../shared/components/error-component';

@NgModule({
    declarations:[ErrorComponent],
    imports:[HttpClientModule, CommonModule, BrowserModule],
    exports:[HttpClientModule, ErrorComponent],
    providers:[
        { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ]
})


export class CoreModule {
    
}


