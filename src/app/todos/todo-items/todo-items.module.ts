import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TodoItemsComponent } from './todo-items.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TodoItemsComponent],
  exports: [TodoItemsComponent]
})
export class TodoItemsModule { }
