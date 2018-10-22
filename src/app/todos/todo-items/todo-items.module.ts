import { NgModule } from '@angular/core';


import { FilterTodoItemsPipe } from './filter-todo-items.pipe';
import { TodoItemsRoutingModule } from './todo-items-routing.module';
import { TodoItemsComponent } from './todo-items.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    TodoItemsRoutingModule,
  ],
  declarations: [
    TodoItemsComponent,
    FilterTodoItemsPipe
  ],
})
export class TodoItemsModule { }
