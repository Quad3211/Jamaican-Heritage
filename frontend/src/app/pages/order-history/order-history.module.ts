import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { OrderHistoryComponent } from './order-history.component';

@NgModule({
  declarations: [OrderHistoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: OrderHistoryComponent }]),
  ],
})
export class OrderHistoryModule {}
