import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing-module';
import { Products } from './components/products/products';

@NgModule({
  declarations: [],
  imports: [CommonModule, ProductsRoutingModule],
})
export class ProductsModule {}
