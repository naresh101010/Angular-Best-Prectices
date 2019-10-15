import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule }  from '@modules/auth/auth.module';
import { AuthGuard } from './modules/core';

const routes: Routes = [
    { path:'', loadChildren:'@modules/front/front.module#FrontModule' },    
    { path:'dashboard', loadChildren:'@modules/dashboard/dashboard.module#DashboardModule', canActivate:[AuthGuard]},
    { path:'auth',  loadChildren:'@modules/auth/auth.module#AuthModule'},
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

