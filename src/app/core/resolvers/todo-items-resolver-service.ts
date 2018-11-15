import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { map, take } from 'rxjs/operators';

import { FetchTodoItemFailed, FetchTodoItemSuccessfully } from '../../ngxs/todo-items/todo-items.actions';
import { TodoItemsService } from '../services/todo-items.service';

@Injectable({
  providedIn: 'root',
})
export class TodoItemsResolverService implements Resolve<any> {
  constructor(
    private todoItemsService: TodoItemsService,
    private router: Router,
    private action$: Actions
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    this.todoItemsService.fetchTodoItems();

    return this.action$
    .pipe(
      take(2),
      ofActionDispatched(FetchTodoItemSuccessfully, FetchTodoItemFailed),
      map(({payload}) => {
        if (payload instanceof HttpErrorResponse) {
          this.router.navigate(['home']);
        }
        if (payload.length) {
          return payload;
        }
        if (!payload.length) {
          return [];
        }
      }),
    );

  }
}
