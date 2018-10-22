import { NgModule } from '@angular/core';

import { TodosRoutingModule } from '../todos-routing.module';

import { FooterComponent } from './footer.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    TodosRoutingModule
  ],
  declarations: [FooterComponent],
  exports: [FooterComponent]
})
export class FooterModule { }
