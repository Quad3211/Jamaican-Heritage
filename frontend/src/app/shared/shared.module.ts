import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LoadingSpinnerComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, LoadingSpinnerComponent],
})
export class SharedModule {}
