import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, map, mapTo, switchMap, withLatestFrom } from 'rxjs/operators';

import { TodoItems } from '../models/todo-items';

@Injectable({
  providedIn: 'root',
})
export class TodoItemsService {
  todoItems$: BehaviorSubject<TodoItems[]> = new BehaviorSubject<TodoItems[]>([]);

  addTodoItem$ = new Subject<TodoItems[]>();
  fetchTodoItems$ = new Subject<TodoItems[]>();
  deleteTodoItem$ = new Subject();
  toggleTodoItemComplete$ = new Subject();


  constructor(
    private http: HttpClient) {
    this.fetchTodoItems();

    this.fetchTodoItems$
      .pipe(
        switchMap(() =>
          this.http.get<TodoItems[]>(`todo-items`)
        ),
        catchError(this.handleError),
        withLatestFrom(this.todoItems$),
        map(([todoItem]) => {
          return todoItem;
        })
      )
      .subscribe(
        this.todoItems$
      );

    this.addTodoItem$
      .pipe(
        switchMap((newTodoItem) => {
            return this.http.post<TodoItems>(`todo-items`, newTodoItem);
          }
        ),
        catchError(this.handleError),
        withLatestFrom(this.todoItems$),
        map(([todoItem, todoItems]) => {
            return todoItems.concat(todoItem);
          }
        )
      )
      .subscribe(this.todoItems$);

    this.deleteTodoItem$
      .pipe(
        switchMap((id) => {
            return this.http.delete(`todo-items/${id}`)
              .pipe(mapTo(id));
          }
        ),
        catchError(this.handleError),
        withLatestFrom(this.todoItems$),
        map(([id, todoItems]) => {
            return todoItems.filter(item => item.id !== id);
          }
        )
      )
      .subscribe(
        this.todoItems$
      );

    this.toggleTodoItemComplete$
      .pipe(
        switchMap((id) => {
            const updateData = this.todoItems$.value.filter(item =>
              item.id === id
            );
            updateData[0].complete = !updateData[0].complete;
            return this.http.put<TodoItems>(`todo-items/${id}`, updateData[0]);
          }
        ),
        catchError(this.handleError),
        withLatestFrom(this.todoItems$),
        map(([todoItem, todoItems]) => {
            todoItems.splice(todoItems.findIndex(items => items.id === todoItem.id), 1, todoItem);
            return todoItems;
          }
        )
      )
      .subscribe(this.todoItems$);

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
    this.fetchTodoItems$.next();
  }

  toggleTodoItemComplete(id: number) {
    this.toggleTodoItemComplete$.next(id);
  }

  addTodoItem(newTodoItem) {
    this.addTodoItem$.next(newTodoItem);
  }

  deleteTodoItemById(id: number) {
    this.deleteTodoItem$.next(id);
  }


}

