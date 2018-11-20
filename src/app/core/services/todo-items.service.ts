import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

import { TodoItem } from '../models/todo-item';

@Injectable({
  providedIn: 'root',
})
export class TodoItemsService {
  constructor(
    private http: HttpClient) {



  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.message) {
      errorMessage = error.message;
    }
    const initialState = {message: errorMessage};
    console.error(initialState);
    return throwError(error);
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

