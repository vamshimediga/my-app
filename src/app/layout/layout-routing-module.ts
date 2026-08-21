import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth.guard';
import { LayoutComponent } from './components/layout-component/layout-component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],

    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },

      {
        path: 'dashboard',
        loadChildren: () =>
          import('../features/dashboard/dashboard.module')
            .then(m => m.DashboardModule)
      },

      {
        path: 'users',
        loadChildren: () =>
          import('../features/users/users.module')
            .then(m => m.UsersModule)
      },

      {
        path: 'products',
        loadChildren: () =>
          import('../features/products/products.module')
            .then(m => m.ProductsModule)
      },

      {
        path: 'orders',
        loadChildren: () =>
          import('../features/orders/orders.module')
            .then(m => m.OrdersModule)
      },

      {
        path: 'reports',
        loadChildren: () =>
          import('../features/reports/reports.module')
            .then(m => m.ReportsModule)
      },

      {
        path: 'settings',
        loadChildren: () =>
          import('../features/settings/settings.module')
            .then(m => m.SettingsModule)
      },
      {
        path: 'customer',
        loadChildren: () =>
          import('../features/customer/customer.module')
            .then(m => m.CustomerModule)
      },
      {
        path: 'designation',
        loadComponent: () =>
        import(
      '../features/customer/Components/designation/designation'
       ).then( m => m.DesignationComponent)
      },
      {
        path: 'goodservices',
        loadChildren: () =>
        import(
      '../features/goods-service/goods-service.module'
       ).then( m => m.GoodsServiceModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}