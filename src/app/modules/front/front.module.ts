import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router'
import { SharedModule } from '@shared/shared.module';
import { FrontComponent } from './front.component';
import { BannerComponent } from './banner/banner.component';
import { NavComponent } from './nav/nav.component';
import { MainBodyComponent } from './main-body/main-body.component';
import { LeftSideComponent } from './main-body/left-side/left-side.component';
import { RightSideComponent } from './main-body/right-side/right-side.component';
import { FooterComponent } from './footer/footer.component';
import { EventComponent } from './main-body/left-side/event/event.component';


const frontRoutes:Routes = [
    {path:'', component:FrontComponent}
]

@NgModule({
    imports:[RouterModule.forChild(frontRoutes), SharedModule],
    declarations: [FrontComponent,  BannerComponent, NavComponent, MainBodyComponent, LeftSideComponent, RightSideComponent, FooterComponent, EventComponent]
})


export class FrontModule { }