import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { TodoItems } from '../models/todo-items';

@Injectable({
  providedIn: 'root',
})
export class TodoItemsService {
  todoItems: TodoItems[];
  updateTodoItems = new Subject<TodoItems[]>();

  constructor(private http: HttpClient) {
    this.fetchTodoItems();
  }


  fetchTodoItems() {
    this.http.get('http://localhost:3000/todo-items')
    .pipe(
      catchError(this.handleError),
      map(itemData => {
        console.log(itemData);
        const items = [];
        for ( const key in itemData) {
          if (itemData.hasOwnProperty(key)) {
            items.push({...itemData[key]});
          }
        }
        return items;
      }))
    .subscribe(transformData => {
      console.log(transformData);
      this.todoItems = transformData;
      this.updateTodoItems.next([...this.todoItems]);
    });
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.message) {
      errorMessage = error.message;
    }
    const initialState = { message: errorMessage};
    console.log(initialState);
    return throwError(error);
  }


  toggleTodoItemComplete(id: number) {
    const updateItems = this.todoItems.map(
      item => {
        if (item.id === id) {
          item.complete = !item.complete;
        }
        return item;
      }
    );

    this.todoItems = updateItems;
    this.updateTodoItems.next([...this.todoItems]);

  }

  addTodoItem(newItem: any) {
    this.todoItems.push(newItem);
    this.updateTodoItems.next([...this.todoItems]);
  }


  deleteTodoItemById(id: number) {
    const updateItems = this.todoItems.filter(item => item.id !== id);
    this.todoItems = updateItems;
    this.updateTodoItems.next([...this.todoItems]);
  }

  getUpdateTodoItems() {
    return this.updateTodoItems.asObservable();
  }
}
