import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TodoItem } from '../models/todo-item';

@Injectable({
  providedIn: 'root',
})
export class TodoItemsRequestsService {
  constructor(
    private http: HttpClient
  ) {
  }

  fetchTodoItems() {
    return this.http.get<TodoItem[]>(`todo-items`);
  }

  addTodoItem(todoItem: TodoItem) {
    return this.http.post<TodoItem>(`todo-items`, todoItem);
  }

  toggleTodoItemComplete(todoItem: TodoItem) {
    return this.http.put<TodoItem>(`todo-items/${todoItem.id}`, todoItem);
  }

  deleteTodoItemById(id: number) {
    return this.http.delete(`todo-items/${id}`);
  }
}
