import { Component } from '@angular/core';
import { Store } from '@ngxs/store';

import { TodoItems } from '../../core/models/todo-items';
import { TodoItemsService } from '../../core/services/todo-items.service';
import { AddTodoItem } from '../../ngxs/todos/todo-items.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  newTodoItem: TodoItems;
  clearValue = '';

  constructor(
    private todoItemService: TodoItemsService,
    private store: Store) {
  }

  addTodoItem(value: string) {
    this.newTodoItem = new TodoItems();
    if (value) {
      this.newTodoItem.title = value;
      this.store.dispatch(new AddTodoItem(this.newTodoItem));
      this.clearValue = '';
    }
  }

}
