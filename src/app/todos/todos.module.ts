import { NgModule } from '@angular/core';

import {FooterModule} from './footer/footer.module';
import {HeaderModule} from './header/header.module';
import { TodoItemsModule } from './todo-items/todo-items.module';
import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './todos.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TodosComponent
  ],
  imports: [
    SharedModule,
    TodosRoutingModule,
    HeaderModule,
    FooterModule,
    TodoItemsModule
  ]

})
export class TodosModule { }
