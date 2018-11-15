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

  fetchTodoItems() {
    this.store.dispatch(new FetchTodoItems());
  }

  addTodoItem(todoItem: TodoItem) {
    this.store.dispatch(new AddTodoItem(todoItem));
  }

  toggleTodoItemsComplete(id: number) {
    this.store.dispatch(new ToggleTodoItemsComplete(id));
  }

  deleteTodoItem(id: number) {
    this.store.dispatch(new DeleteTodoItem(id));
  }


}

