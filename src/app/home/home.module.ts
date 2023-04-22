import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { DetailComponent } from './modals/detail/detail.component';
import { FormComponent } from './modals/form/form.component';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { FilterPipe } from '../pipes/filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OrderByPipe,
    FilterPipe,
    HomePageRoutingModule,
  ],
  declarations: [HomePage, DetailComponent, FormComponent]
})
export class HomePageModule {}
