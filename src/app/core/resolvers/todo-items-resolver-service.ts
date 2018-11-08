import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';

import { FetchTodoItems } from '../../ngxs/todos/todo-items.actions';
import { TodoItemsService } from '../services/todo-items.service';

@Injectable({
  providedIn: 'root',
})
export class TodoItemsResolverService implements Resolve<void> {
  constructor(
    private todoItemsService: TodoItemsService,
    private store: Store) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    this.store.dispatch(new FetchTodoItems());
  }
}
