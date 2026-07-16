import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { Dashboard } from './pages/dashboard/dashboard';


@NgModule({

  declarations: [],

  imports: [
    CommonModule,
    Dashboard,
    DashboardRoutingModule
  ]

})
export class DashboardModule { }