import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FooterComponent } from './footer.component';
import { TodosRoutingModule } from '../todos-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TodosRoutingModule
  ],
  declarations: [FooterComponent],
  exports: [FooterComponent]
})
export class FooterModule { }
