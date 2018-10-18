import { Component, OnInit } from '@angular/core';

import { TodoItems } from '../../core/models/todo-items';
import { TodoItemsService } from '../../core/services/todo-items.service';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent implements OnInit {
  todoItems: TodoItems[];

  constructor(private todoItemsService: TodoItemsService) {}

  ngOnInit() {
    this.todoItems = this.todoItemsService.todoItems;
  }
}
