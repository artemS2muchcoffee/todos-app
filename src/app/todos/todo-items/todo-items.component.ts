import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TodoItem } from '../../core/models/todo-item';
import { TodoItemsService } from '../../core/services/todo-items.service';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent implements OnInit {
  todoItems$: Observable<TodoItem[]>;
  stateTodoItems = false;

  constructor(
    private todoItemsService: TodoItemsService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.todoItems$ = combineLatest(
      this.todoItemsService.todoItems$,
      this.route.data
      .pipe(
        map(data => data.complete)
      )
    )
    .pipe(
      map(([items, complete]) => {
        if (!items.length) {
          this.stateTodoItems = true;
        } else {
          this.stateTodoItems = false;
        }
        return items.filter(
          (item: TodoItem) => complete === undefined || complete === item.complete
        );
      })
    );
  }

  changeTodoItemComplete(id: number) {
    this.todoItemsService.toggleTodoItemsComplete(id);
  }

  deleteTodoItemById(id: number) {
    this.todoItemsService.deleteTodoItem(id);
  }

}

