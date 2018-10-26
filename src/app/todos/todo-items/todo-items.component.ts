import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { TodoItems } from '../../core/models/todo-items';
import { TodoItemsService } from '../../core/services/todo-items.service';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent implements OnInit {
  snapshotIsComplete: boolean;
  todoItems$: Observable<TodoItems[]>;

  constructor(
    private todoItemsService: TodoItemsService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.todoItems$ = this.todoItemsService.todoItems$;
    this.snapshotIsComplete = this.route.snapshot.data.complete;
    this.todoItemsService.fetchTodoItems();
  }

  changeTodoItemComplete(itemId: number) {
    this.todoItemsService.toggleTodoItemComplete(itemId);
  }

  deleteTodoItemById(itemId: number) {
    this.todoItemsService.deleteTodoItemById(itemId);
  }


}
