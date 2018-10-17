import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {FooterModule} from './footer/footer.module';
import {HeaderModule} from './header/header.module';
import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './todos.component';

@NgModule({
  declarations: [
    TodosComponent
  ],
  imports: [
    CommonModule,
    TodosRoutingModule,
    HeaderModule,
    FooterModule
  ]

})
export class TodosModule { }
