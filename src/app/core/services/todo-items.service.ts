import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { TODO_ITEMS } from '../mock/mock-todo-items';
import { TodoItems } from '../models/todo-items';

@Injectable({
  providedIn: 'root',
})
export class TodoItemsService {
  todoItems: TodoItems[] = TODO_ITEMS;
  updateTodoItems = new Subject<TodoItems[]>();

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
