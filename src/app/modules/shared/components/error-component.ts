import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@modules/core/services/error-noticfication.service';
@Component({
    selector:'error',
    template:`
        <div class="alert alert-success" *ngIf="errorMsg">
            <strong>Success!</strong> {{errorMsg}}
        </div>
    `
})

export class ErrorComponent implements OnInit {
    errorMsg:string = ''
    constructor(private NotificationService:NotificationService){}    
    ngOnInit() {
        this.NotificationService.notification$.subscribe(err=>{
            this.errorMsg = err;
        })
    }
}