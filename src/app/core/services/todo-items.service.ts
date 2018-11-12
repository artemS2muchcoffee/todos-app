import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import {
  AddTodoItem,
  DeleteTodoItem, FetchTodoItems,
  ToggleTodoItemsComplete
} from '../../ngxs/todo-items/todo-items.actions';
import { TodoItemsState } from '../../ngxs/todo-items/todo-items.state';
import { TodoItem } from '../models/todo-item';

@Injectable({
  providedIn: 'root',
})
export class TodoItemsService {
  @Select(TodoItemsState.getTodoItems) todoItems$: Observable<TodoItem[]>;
  @Select(TodoItemsState.getTodoItemsIdsCount) count$: Observable<number>;

  constructor(
    private store: Store
  ) {
  }

  FetchTodoItems() {
    this.store.dispatch(new FetchTodoItems());
  }

  AddTodoItem(todoItem: TodoItem) {
    this.store.dispatch(new AddTodoItem(todoItem));
  }

  ToggleTodoItemsComplete(id: number) {
    this.store.dispatch(new ToggleTodoItemsComplete(id));
  }

  DeleteTodoItem(id: number) {
    this.store.dispatch(new DeleteTodoItem(id));
  }


}

