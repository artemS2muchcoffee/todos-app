import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { TodosRoutingModule } from '../todos-routing.module';

import { FooterComponent } from './footer.component';

@NgModule({
  imports: [
    SharedModule,
    TodosRoutingModule
  ],
  declarations: [FooterComponent],
  exports: [FooterComponent]
})
export class FooterModule {
}
