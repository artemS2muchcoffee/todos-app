import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { FilterTodoItemsPipe } from './filter-todo-items.pipe';
import { TodoItemsRoutingModule } from './todo-items-routing.module';
import { TodoItemsComponent } from './todo-items.component';

@NgModule({
  imports: [
    CommonModule,
    TodoItemsRoutingModule,
  ],
  declarations: [
    TodoItemsComponent,
    FilterTodoItemsPipe
  ],
})
export class TodoItemsModule { }
