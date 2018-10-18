import { Injectable } from '@angular/core';

import { TODO_ITEMS } from '../mock/mock-todo-items';
import { TodoItems } from '../models/todo-items';

@Injectable({
  providedIn: 'root',
})
export class TodoItemsService {
  todoItems: TodoItems[] = TODO_ITEMS;
}
