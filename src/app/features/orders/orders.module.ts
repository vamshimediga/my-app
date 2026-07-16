import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing-module';
import { Orders } from './components/orders/orders';

@NgModule({
  declarations: [],
  imports: [CommonModule, OrdersRoutingModule],
})
export class OrdersModule {}
