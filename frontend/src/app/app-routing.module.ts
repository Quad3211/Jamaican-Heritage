import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home | Jamaican Heritage' },
  {
    path: 'shop',
    loadChildren: () =>
      import('./pages/shop/shop.module').then((m) => m.ShopModule),
    title: 'Shop | Jamaican Heritage',
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about/about.module').then((m) => m.AboutModule),
    title: 'About | Jamaican Heritage',
  },
  {
    path: 'info',
    loadChildren: () =>
      import('./pages/info/info.module').then((m) => m.InfoModule),
    title: 'Info | Jamaican Heritage',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
    title: 'Login | Jamaican Heritage',
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule),
    title: 'Register | Jamaican Heritage',
  },

  // Protected lazy-loaded pages
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule,
      ),
    title: 'Dashboard | Jamaican Heritage',
  },
  {
    path: 'cart',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/cart/cart.module').then((m) => m.CartModule),
    title: 'Cart | Jamaican Heritage',
  },
  {
    path: 'orders',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/order-history/order-history.module').then(
        (m) => m.OrderHistoryModule,
      ),
    title: 'Orders | Jamaican Heritage',
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfileModule),
    title: 'Profile | Jamaican Heritage',
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
