import { Component } from '@angular/core';

import { TodoItemsService } from '../../core/services/todo-items.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(
    private todoItemsService: TodoItemsService) {
  }

  get countItems(): number {
    if (!this.todoItemsService.todoItems) {
      return;
    }
    return this.todoItemsService.todoItems.length;
  }
}
