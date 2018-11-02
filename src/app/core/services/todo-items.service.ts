import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { TodoItems } from '../models/todo-items';

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
    return this.http.get<TodoItems[]>(`todo-items`)
    .pipe(
      catchError(this.handleError)
    );
  }

  addTodoItem(payload: TodoItems) {
    return this.http.post<TodoItems>(`todo-items`, payload)
    .pipe(
      catchError(this.handleError)
    );
  }

  toggleTodoItemComplete(payload: TodoItems) {
    return this.http.put<TodoItems>(`todo-items/${payload.id}`, payload)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteTodoItemById(payload: TodoItems) {
    return this.http.delete(`todo-items/${payload.id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

}

