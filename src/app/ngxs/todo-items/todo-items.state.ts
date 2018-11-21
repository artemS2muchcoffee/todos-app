import { Action, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { TodoItem } from '../../core/models/todo-item';
import { TodoItemsService } from '../../core/services/todo-items.service';

import * as todoItemsAction from './todo-items.actions';

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

  constructor(
    private todoItemsService: TodoItemsService
  ) {
  }

  @Action(todoItemsAction.FetchTodoItems)
  fetchTodoItems(
    {patchState, dispatch}: StateContext<TodoItemsStateModel>
  ) {
    return this.todoItemsService.fetchTodoItems()
    .pipe(
      tap(
        items => dispatch(new todoItemsAction.FetchTodoItemSuccessfully(items))
      ),
      catchError(
        error => dispatch(new todoItemsAction.FetchTodoItemFailed(error))
      )
    );
  }

  @Action(todoItemsAction.FetchTodoItemSuccessfully)
  fetchTodoItemSuccessfully(
    {patchState}: StateContext<TodoItemsStateModel>,
    {payload: todoItems}: todoItemsAction.FetchTodoItemSuccessfully
  ) {
    patchState(
      {
        todoItems: todoItems.reduce((items, currentItem) => ({
          ...items,
          [currentItem.id]: currentItem
        }), {}),
        todoItemsIds: todoItems.map(item => item.id)
      }
    );
  }
}
