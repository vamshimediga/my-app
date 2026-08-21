import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoodsServiceComponent } from './goods-service/goods-service';

const routes: Routes = [
  {
        path: '',
        component: GoodsServiceComponent
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoodsServiceRoutingModule {}
