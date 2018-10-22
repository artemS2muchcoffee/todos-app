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
        const items = [];
        for ( const key in itemData) {
          if (itemData.hasOwnProperty(key)) {
            items.push({...itemData[key]});
          }
        }
        return items;
      }))
    .subscribe(transformData => {
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
    const strId = '' + id;
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
    this.http.put('http://localhost:3000/todo-items/' + strId, updateData)
    .pipe(
      catchError(this.handleError)
    )
    .subscribe( () => {
      const updateItemsData = [...this.todoItems];
      const oldItemIndex = updateItemsData.findIndex(item => item.id === id);
      const itemEditData: TodoItems = {
        id: updateData.id,
        title: updateData.title,
        complete: updateData.complete
      };
      updateItemsData[oldItemIndex] = itemEditData;
      this.todoItems = updateItemsData;
      this.updateTodoItems.next([...this.todoItems]);

    });
  }

  addTodoItem(newItem) {
    this.http.post('http://localhost:3000/todo-items', newItem)
    .pipe(
      catchError(this.handleError)
    )
    .subscribe(response => {
      if (response) {
        this.todoItems.push(
          {
            id: newItem.id,
            title: newItem.title,
            complete: newItem.complete
          });
        this.updateTodoItems.next([...this.todoItems]);
      }
    });
  }

  deleteTodoItemById(id: number) {
    const strId = '' + id;
    this.http.delete('http://localhost:3000/todo-items/' + strId)
    .pipe(
      catchError(this.handleError)
    )
    .subscribe(() => {
      const updateItems = this.todoItems.filter(item => item.id !== id);
      this.todoItems = updateItems;
      this.updateTodoItems.next([...this.todoItems]);
    });
  }

  getUpdateTodoItems() {
    return this.updateTodoItems.asObservable();
  }
}
