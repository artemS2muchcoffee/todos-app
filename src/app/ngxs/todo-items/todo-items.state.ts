import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { TodoItem } from '../../core/models/todo-item';
import { TodoItemsRequestsService } from '../../core/services/todo-items-requests.service';

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

  @Selector()
  static getTodoItems(state: TodoItemsStateModel) {
    return state.todoItemsIds.map(id => state.todoItems[id]);
  }

  @Selector()
  static getTodoItemsIdsCount(state: TodoItemsStateModel) {
    return state.todoItemsIds.length;
  }

  constructor(
    private todoItemsRequestsService: TodoItemsRequestsService
  ) {
  }

  @Action(todoItemsAction.FetchTodoItems)
  fetchTodoItems(
    {patchState, dispatch}: StateContext<TodoItemsStateModel>
  ) {
    return this.todoItemsRequestsService.fetchTodoItems()
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

  @Action(todoItemsAction.AddTodoItem)
  addTodoItem(
    {patchState, dispatch}: StateContext<TodoItemsStateModel>,
    {payload: todoItem}: todoItemsAction.AddTodoItem
  ) {
    return this.todoItemsRequestsService.addTodoItem(todoItem)
    .pipe(
      tap(
        item => dispatch(new todoItemsAction.AddTodoItemSuccessfully(item))
      ),
      catchError(
        error => dispatch(new todoItemsAction.AddTodoItemFailed(error))
      )
    );
  }

  @Action(todoItemsAction.AddTodoItemSuccessfully)
  addTodoItemSuccessfully(
    {getState, patchState, setState}: StateContext<TodoItemsStateModel>,
    {payload: todoItem}: todoItemsAction.AddTodoItemSuccessfully
  ) {
    const state = getState();
    patchState(
      {
        todoItems: [todoItem].reduce((item, currentItem) => ({
          ...item,
          [currentItem.id]: currentItem
        }), state.todoItems),
        todoItemsIds: state.todoItemsIds.concat(todoItem.id)
      }
    );
  }

  @Action(todoItemsAction.DeleteTodoItem)
  deleteTodoItem(
    {patchState, dispatch}: StateContext<TodoItemsStateModel>,
    {payload: id}: todoItemsAction.DeleteTodoItem
  ) {
    return this.todoItemsRequestsService.deleteTodoItemById(id)
    .pipe(
      tap(
        () => dispatch(new todoItemsAction.DeleteTodoItemSuccessfully(id))
      ),
      catchError(
        error => dispatch(new todoItemsAction.DeleteTodoItemFailed(error))
      )
    );
  }

  @Action(todoItemsAction.DeleteTodoItemSuccessfully)
  deleteTodoItemSuccessfully(
    {getState, patchState, setState}: StateContext<TodoItemsStateModel>,
    {payload: id}: todoItemsAction.DeleteTodoItemSuccessfully
  ) {
    const state = getState();
    patchState(
      {
        todoItemsIds: state.todoItemsIds.filter(itemIds => itemIds !== id)
      }
    );
  }

  @Action(todoItemsAction.ToggleTodoItemsComplete)
  toggleTodoItemsComplete(
    {patchState, dispatch, getState}: StateContext<TodoItemsStateModel>,
    {payload: id}: todoItemsAction.ToggleTodoItemsComplete
  ) {
    const state = getState();
    const todoItem = {...state.todoItems[id]};
    todoItem.complete = !todoItem.complete;
    return this.todoItemsRequestsService.toggleTodoItemComplete(todoItem)
    .pipe(
      tap(
        item => dispatch(new todoItemsAction.ToggleTodoItemCompleteSuccessfully(item))
      ),
      catchError(
        error => dispatch(new todoItemsAction.ToggleTodoItemCompleteFailed(error))
      )
    );
  }

  @Action(todoItemsAction.ToggleTodoItemCompleteSuccessfully)
  toggleTodoItemSuccessfully(
    {getState, patchState}: StateContext<TodoItemsStateModel>,
    {payload: todoItem}: todoItemsAction.ToggleTodoItemCompleteSuccessfully
  ) {
    const state = getState();
    const todoItemState = state.todoItems[todoItem.id];
    todoItemState.complete = todoItem.complete;
    patchState(
      {
        todoItems: state.todoItems
      }
    );
  }

  @Action(todoItemsAction.DeleteTodoItemFailed)
  @Action(todoItemsAction.AddTodoItemFailed)
  @Action(todoItemsAction.ToggleTodoItemCompleteFailed)
  @Action(todoItemsAction.FetchTodoItemFailed)
  fetchTodoItemFailed(
    {dispatch}: StateContext<TodoItemsStateModel>,
    {payload: error}: todoItemsAction.FetchTodoItemFailed
  ) {
    let errorMessage = 'An unknown error occurred!';
    if (error.message) {
      errorMessage = error.message;
    }
    const initialState = {message: errorMessage};
    dispatch(console.error(initialState));
  }

}
