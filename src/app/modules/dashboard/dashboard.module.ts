import { NgModule } from '@angular/core' ;
import { DashboardComponent } from './dashboard.component';
import { DashboardRouterModule } from './dashboard-router.module';

@NgModule({    
    declarations:[DashboardComponent],
    imports:[DashboardRouterModule]
})

export class DashboardModule {

}