import { Component } from '@angular/core';

import { TodoItem } from '../../core/models/todo-item';
import { TodoItemsService } from '../../core/services/todo-items.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  newTodoItem: TodoItem;
  clearValue = '';

  constructor(
    private todoItemService: TodoItemsService
  ) {
  }

  addTodoItem(value: string) {
    this.newTodoItem = new TodoItem();
    if (value) {
      this.newTodoItem.title = value;
      this.todoItemService.AddTodoItem(this.newTodoItem);
      this.clearValue = '';
    }
  }

}
