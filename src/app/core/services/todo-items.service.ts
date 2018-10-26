import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, map, mapTo, switchMap } from 'rxjs/operators';

import { TodoItems } from '../models/todo-items';

@Injectable({
  providedIn: 'root',
})
export class TodoItemsService {
  todoItems: TodoItems[];

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
          this.http.get<TodoItems>(`todo-items`)
            .pipe(
              map(responseItemData => {
                  const items = [];
                  for (const key in responseItemData) {
                    if (responseItemData.hasOwnProperty(key)) {
                      items.push({...responseItemData[key]});
                    }
                  }
                  return items;
                }
              ))
        ),
        catchError(this.handleError),
      )
      .subscribe(transformData => {
        this.todoItems = transformData;
      });

    this.addTodoItem$
      .pipe(
        switchMap((newTodoItem) => {
          return this.http.post<TodoItems>(`todo-items`, newTodoItem);
        }),
        catchError(this.handleError)
      )
      .subscribe((todoItem) => {
        this.todoItems = this.todoItems.concat(todoItem);
      });

    this.deleteTodoItem$
      .pipe(
        switchMap((itemId) => {
          return this.http.delete<TodoItems>(`todo-items/${itemId}`)
            .pipe(mapTo(itemId));
        }),
        catchError(this.handleError)
      )
      .subscribe((itemId) => {
        this.todoItems = this.todoItems.filter(item => item.id !== itemId);
      });

    this.toggleTodoItemComplete$
      .pipe(
        switchMap((itemId) => {
          let updateData;
          this.todoItems.filter(item => {
            if (item.id === itemId) {
              item.complete = !item.complete;
              updateData = {
                id: item.id,
                title: item.title,
                complete: item.complete
              };
            }
          });
          return this.http.put<TodoItems>(`todo-items/${itemId}`, updateData);

        }),
        catchError(this.handleError),
      )
      .subscribe((item) => {
        const isUpdated = Object.values(item);
        const updateItemsData = [...this.todoItems];
        const oldItemIndex = updateItemsData.findIndex(items => items.id === isUpdated[0]);
        updateItemsData[oldItemIndex] = {
          id: isUpdated[0],
          title: isUpdated[1],
          complete: isUpdated[2]
        };
        this.todoItems = updateItemsData;
      });


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

  toggleTodoItemComplete(itemId) {
    this.toggleTodoItemComplete$.next(itemId);
  }

  addTodoItem(newTodoItem) {
    this.addTodoItem$.next(newTodoItem);
  }

  deleteTodoItemById(itemId) {
    this.deleteTodoItem$.next(itemId);
  }


}

