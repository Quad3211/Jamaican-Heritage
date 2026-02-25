import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { AboutComponent } from './pages/about/about.component';
import { InfoComponent } from './pages/info/info.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home | Jamaican Heritage' },
  { path: 'shop', component: ShopComponent, title: 'Shop | Jamaican Heritage' },
  {
    path: 'shop/:id',
    component: ProductDetailComponent,
    title: 'Product | Jamaican Heritage',
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About | Jamaican Heritage',
  },
  { path: 'info', component: InfoComponent, title: 'Info | Jamaican Heritage' },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login | Jamaican Heritage',
  },
  {
    path: 'register',
    component: RegisterComponent,
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
