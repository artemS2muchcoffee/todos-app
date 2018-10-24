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
    this.http.get('http://localhost:3000/todo-items')
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
    const updateItems = [...this.todoItems];
    updateItems.map(
      item => {
        if (item.id === id) {
          item.complete = !item.complete;
        }
        return item;
      }
    );
    this.todoItems = updateItems;
  }

  addTodoItem(newItem: any) {
    const updateItems = [...this.todoItems];
    updateItems.push(
      {
        id: newItem.id,
        title: newItem.title,
        complete: newItem.complete
      });
    this.todoItems = updateItems;
  }

  deleteTodoItemById(id: number) {
    this.todoItems = this.todoItems.filter(item => item.id !== id);
  }


}
