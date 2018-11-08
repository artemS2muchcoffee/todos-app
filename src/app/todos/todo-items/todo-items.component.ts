import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { combineLatest, map } from 'rxjs/operators';

import { TodoItems } from '../../core/models/todo-items';
import { TodoItemsService } from '../../core/services/todo-items.service';
import { DeleteTodoItem, ToggleTodoItemsComplete } from '../../ngxs/todos/todo-items.actions';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent implements OnInit {
  todoItems$: Observable<TodoItems[]>;

  constructor(
    private todoItemsService: TodoItemsService,
    private route: ActivatedRoute,
    private store: Store) {

  }

  ngOnInit() {
    this.todoItems$ = this.store.select(state => state.todoItems.todoItems)
    .pipe(
      combineLatest(
        this.route.data
        .pipe(map(
          data => data.complete
        ))
      ),
      map(([items, complete]) => {
        console.log(Object.keys(items));
        return Object.values(items).filter(
          (item: TodoItems) => complete === undefined || complete === item.complete
        );
      })
    );

  }

  changeTodoItemComplete(item: TodoItems) {
    this.store.dispatch(new ToggleTodoItemsComplete(item));
  }

  deleteTodoItemById(item: TodoItems) {
    this.store.dispatch(new DeleteTodoItem(item));
  }

}

