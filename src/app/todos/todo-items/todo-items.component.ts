import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TodoItems } from '../../core/models/todo-items';
import { TodoItemsService } from '../../core/services/todo-items.service';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent implements OnInit, DoCheck {
  todoItems: TodoItems[];
  data;

  constructor(
    private todoItemsService: TodoItemsService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.todoItems = this.todoItemsService.todoItems;
    this.data = this.route.snapshot.data.path;
  }

  ngDoCheck() {
    this.todoItems = this.todoItemsService.todoItems;
  }

  changeTodoItemComplete(itemId: number) {
    this.todoItemsService.toggleTodoItemComplete(itemId);
  }

  deleteTodoItemById(itemId: number) {
    this.todoItemsService.deleteTodoItemById(itemId);
  }
}
