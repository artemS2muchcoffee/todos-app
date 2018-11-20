import { State } from '@ngxs/store';

import { TodoItem } from '../../core/models/todo-item';

export interface TodoItemsStateModel {
  todoItems: {
    [id: number]: TodoItem
  };
  todoItemsIds: number[];
}


@State<TodoItemsStateModel>({
  name: 'todoItems',
  defaults: {
    todoItems: {},
    todoItemsIds: []
  }
})

export class TodoItemsState {
}
