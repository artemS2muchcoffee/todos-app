import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

import { TodoItems } from '../../core/models/todo-items';
import { TodoItemsService } from '../../core/services/todo-items.service';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent implements OnInit {
  todoItems$: Observable<TodoItems[]>;

  constructor(
    private todoItemsService: TodoItemsService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.todoItemsService.fetchTodoItems();

    this.todoItems$ = this.todoItemsService.todoItems$
      .pipe(
        withLatestFrom(this.route.data),
        map(
          ([items, complete]) => {
            return items.filter(
              item => complete['complete'] === undefined || complete['complete'] === item.complete
            );
          }
        )
      );

  }

  changeTodoItemComplete(id: number) {
    this.todoItemsService.toggleTodoItemComplete(id);
  }

  deleteTodoItemById(id: number) {
    this.todoItemsService.deleteTodoItemById(id);
  }


}

