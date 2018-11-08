import { Action, State, StateContext } from '@ngxs/store';
import { catchError, map, tap } from 'rxjs/operators';

import { TodoItems } from '../../core/models/todo-items';
import { TodoItemsService } from '../../core/services/todo-items.service';

import * as   todoItemsAction from './todo-items.actions';

export interface TodoItemsStateModel {
  todoItems: {
    [id: number]: TodoItems
  };
  todoItemsIds: {};
  loaded: boolean;
  loading: boolean;
}


@State<TodoItemsStateModel>({
  name: 'todoItems',
  defaults: {
    todoItems: {},
    todoItemsIds: [],
    loaded: false,
    loading: false,
  }
})

export class TodoItemsState {

  constructor(private todoItemsService: TodoItemsService) {
  }

  @Action(todoItemsAction.FetchTodoItems)
  fetchTodoItems(
    {patchState, dispatch}: StateContext<TodoItemsStateModel>
  ) {
    patchState({loading: true});
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
    {payload}: todoItemsAction.FetchTodoItemSuccessfully
  ) {
    patchState(
      {
        todoItems: payload.reduce((items, currentItem) => ({
          ...items,
          [currentItem.id]: currentItem
        }), {}),
        todoItemsIds: payload.map(item => item.id),
        loaded: true,
        loading: false
      }
    );
  }

  @Action(todoItemsAction.FetchTodoItemFailed)
  fetchTodoItemFailed(
    {dispatch}: StateContext<TodoItemsStateModel>
  ) {
    dispatch({loaded: false, loading: false});
  }


  @Action(todoItemsAction.AddTodoItem)
  addTodoItem(
    {patchState, dispatch}: StateContext<TodoItemsStateModel>,
    {payload}: todoItemsAction.AddTodoItem
  ) {
    patchState({loading: true});
    return this.todoItemsService.addTodoItem(payload)
    .pipe(
      tap(
        items => dispatch(new todoItemsAction.AddTodoItemSuccessfully(items))
      ),
      catchError(
        error => dispatch(new todoItemsAction.AddTodoItemFailed(error))
      )
    );
  }

  @Action(todoItemsAction.AddTodoItemSuccessfully)
  addTodoItemSuccessfully(
    {getState, patchState}: StateContext<TodoItemsStateModel>,
    {payload}: todoItemsAction.AddTodoItemSuccessfully
  ) {
    // patchState(
    //   {
    //     todoItems: getState().todoItems.concat(payload),
    //     loaded: true,
    //     loading: false
    //   }
    // );
  }

  @Action(todoItemsAction.AddTodoItemFailed)
  addTodoItemFailed(
    {dispatch}: StateContext<TodoItemsStateModel>
  ) {
    dispatch({loaded: false, loading: false});
  }


  @Action(todoItemsAction.DeleteTodoItem)
  deleteTodoItem(
    {patchState, dispatch}: StateContext<TodoItemsStateModel>,
    {payload}: todoItemsAction.DeleteTodoItem
  ) {
    patchState({loading: true});
    return this.todoItemsService.deleteTodoItemById(payload)
    .pipe(
      tap(
        () => dispatch(new todoItemsAction.DeleteTodoItemSuccessfully(payload))
      ),
      catchError(
        error => dispatch(new todoItemsAction.DeleteTodoItemFailed(error))
      )
    );
  }

  @Action(todoItemsAction.DeleteTodoItemSuccessfully)
  deleteTodoItemSuccessfully(
    {getState, patchState}: StateContext<TodoItemsStateModel>,
    {payload}: todoItemsAction.DeleteTodoItemSuccessfully
  ) {
    patchState(
      {
        // todoItems: getState().todoItems.filter(item => item.id !== payload.id),
        loaded: true,
        loading: false
      }
    );
  }

  @Action(todoItemsAction.DeleteTodoItemFailed)
  deleteTodoItemFailed(
    {dispatch}: StateContext<TodoItemsStateModel>
  ) {
    dispatch({loaded: false, loading: false});
  }


  @Action(todoItemsAction.ToggleTodoItemsComplete)
  toggleTodoItemsComplete(
    {patchState, dispatch}: StateContext<TodoItemsStateModel>,
    {payload}: todoItemsAction.ToggleTodoItemsComplete
  ) {
    patchState({loading: true});
    payload.complete = !payload.complete;
    return this.todoItemsService.toggleTodoItemComplete(payload)
    .pipe(
      tap(
        items => dispatch(new todoItemsAction.ToggleTodoItemCompleteSuccessfully(items))
      ),
      catchError(
        error => dispatch(new todoItemsAction.ToggleTodoItemCompleteFailed(error))
      )
    );
  }

  @Action(todoItemsAction.ToggleTodoItemCompleteSuccessfully)
  toggleTodoItemSuccessfully(
    {getState, patchState}: StateContext<TodoItemsStateModel>,
    {payload}: todoItemsAction.ToggleTodoItemCompleteSuccessfully
  ) {
    patchState(
      {
        // todoItems: getState().todoItems.map(
        //   item => {
        //     if (item.id === payload.id) {
        //       item.complete = payload.complete;
        //     }
        //     return item;
        //   }
        // ),
        loaded: true,
        loading: false
      }
    );
  }

  @Action(todoItemsAction.ToggleTodoItemCompleteFailed)
  toggleTodoItemFailed(
    {dispatch}: StateContext<TodoItemsStateModel>
  ) {
    dispatch({loaded: false, loading: false});
  }


}
