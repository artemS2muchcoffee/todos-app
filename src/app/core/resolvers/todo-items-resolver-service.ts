import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';

import { FetchTodoItems } from '../../ngxs/todo-items/todo-items.actions';

@Injectable({
  providedIn: 'root',
})
export class TodoItemsResolverService implements Resolve<void> {
  constructor(
    private store: Store
    ) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): void {
    this.store.dispatch(new FetchTodoItems());

  }
}
