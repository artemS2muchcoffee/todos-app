import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { TodoItems } from '../models/todo-items';

@Injectable({
  providedIn: 'root',
})
export class TodoItemsService {
  todoItems: TodoItems[];

  constructor(
    private http: HttpClient) {
    this.fetchTodoItems();
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
    this.http.get(`todo-items`)
      .pipe(
        catchError(this.handleError),
        map(responseItemData => {
          const items = [];
          for (const key in responseItemData) {
            if (responseItemData.hasOwnProperty(key)) {
              items.push({...responseItemData[key]});
            }
          }
          return items;
        }))
      .subscribe(transformData => {
        this.todoItems = transformData;
      });
  }

  toggleTodoItemComplete(id: number) {
    let updateData;
    this.todoItems.filter(item => {
      if (item.id === id) {
        item.complete = !item.complete;
        updateData = {
          id: item.id,
          title: item.title,
          complete: item.complete
        };
      }
    });
    this.http.put(`todo-items/${id}`, updateData)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(() => {
        const updateItemsData = [...this.todoItems];
        const oldItemIndex = updateItemsData.findIndex(item => item.id === id);
        updateItemsData[oldItemIndex] = {
          id: updateData.id,
          title: updateData.title,
          complete: updateData.complete
        };
        this.todoItems = updateItemsData;
      });
  }

  addTodoItem(newItem) {
    this.http.post('todo-items', newItem)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(response => {
        const updateItemsData = [...this.todoItems];
        if (response) {
          updateItemsData.push(
            {
              id: newItem.id,
              title: newItem.title,
              complete: newItem.complete
            });
        }
        this.todoItems = updateItemsData;
      });
  }

  deleteTodoItemById(id: number) {
    this.http.delete(`todo-items/${id}`)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(() => {
        this.todoItems = this.todoItems.filter(item => item.id !== id);
      });
  }


}
