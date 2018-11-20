import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, map, mapTo, switchMap, withLatestFrom } from 'rxjs/operators';

import { TodoItem } from '../models/todo-item';

@Injectable({
  providedIn: 'root',
})
export class TodoItemsService {
  todoItems$: BehaviorSubject<TodoItem[]> = new BehaviorSubject<TodoItem[]>([]);

  addTodoItem$ = new Subject<TodoItem[]>();
  fetchTodoItems$ = new Subject<TodoItem[]>();
  deleteTodoItem$ = new Subject();
  toggleTodoItemComplete$ = new Subject();


  constructor(
    private http: HttpClient) {

    this.fetchTodoItems$
      .pipe(
        switchMap(
          () => this.http.get<TodoItem[]>(`todo-items`)
        ),
        catchError(this.handleError)
      )
      .subscribe(this.todoItems$);

    this.addTodoItem$
      .pipe(
        switchMap((newTodoItem) => {
          return this.http.post<TodoItem>(`todo-items`, newTodoItem);
        }),
        catchError(this.handleError),
        withLatestFrom(this.todoItems$),
        map(([todoItem, todoItems]) => {
          return todoItems.concat(todoItem);
        })
      )
      .subscribe(this.todoItems$);

    this.deleteTodoItem$
      .pipe(
        switchMap((id) => {
            return this.http.delete(`todo-items/${id}`).pipe(mapTo(id));
          }
        ),
        catchError(this.handleError),
        withLatestFrom(this.todoItems$),
        map(([id, todoItems]) => {
          return todoItems.filter(item => item.id !== id);
        })
      )
      .subscribe(this.todoItems$);

    this.toggleTodoItemComplete$.pipe(
      switchMap((id) => {
          const updateData = this.todoItems$.value.find(item =>
            item.id === id
          );
          updateData.complete = !updateData.complete;
          return this.http.put<TodoItem>(`todo-items/${id}`, updateData);
        }
      ),
      catchError(this.handleError),
      withLatestFrom(this.todoItems$),
      map(([todoItem, todoItems]) => {
          const itemIndex = todoItems.findIndex(items => items.id === todoItem.id);
          todoItems.splice(itemIndex, 1, todoItem);
          return todoItems;
        }
      )
    ).subscribe(this.todoItems$);

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

