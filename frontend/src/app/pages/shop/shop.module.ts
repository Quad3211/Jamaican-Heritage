import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ShopComponent } from './shop.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

const routes: Routes = [
  { path: '', component: ShopComponent },
  { path: ':id', component: ProductDetailComponent },
];

@NgModule({
  declarations: [ShopComponent, ProductDetailComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class ShopModule {}
