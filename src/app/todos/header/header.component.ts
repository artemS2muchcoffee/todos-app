import { Component } from '@angular/core';

import { TodoItems } from '../../core/models/todo-items';
import { TodoItemsService } from '../../core/services/todo-items.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  newTodoItem: TodoItems;
  clearValue = '';

  constructor(
    private todoItemService: TodoItemsService) {
  }

  addTodoItem(value: string) {
    this.newTodoItem = new TodoItems();
    if (value) {
      this.newTodoItem.title = value;
      this.todoItemService.addTodoItem(this.newTodoItem);
      this.clearValue = '';
    }
  }
}
