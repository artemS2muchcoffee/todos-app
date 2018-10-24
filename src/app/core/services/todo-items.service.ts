import { Injectable } from '@angular/core';

import { TODO_ITEMS } from '../mock/mock-todo-items';
import { TodoItems } from '../models/todo-items';

@Injectable({
  providedIn: 'root',
})
export class TodoItemsService {
  todoItems: TodoItems[] = TODO_ITEMS;

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
