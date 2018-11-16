import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { map, take } from 'rxjs/operators';

import { FetchTodoItemFailed, FetchTodoItemSuccessfully } from '../../ngxs/todo-items/todo-items.actions';
import { TodoItemsRequestsService } from '../services/todo-items-requests.service';
import { TodoItemsService } from '../services/todo-items.service';

@Injectable({
  providedIn: 'root',
})
export class TodoItemsResolverService implements Resolve<any> {
  constructor(
    private todoItemsService: TodoItemsService,
    private todoItemsRequestsService: TodoItemsRequestsService,
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
      ofActionDispatched(FetchTodoItemSuccessfully, FetchTodoItemFailed),
      map(({payload}) => {
        if (payload instanceof HttpErrorResponse) {
          this.router.navigate(['home']);
          return false;
        } else {
          return true;
        }
      }),
      take(1),
    );

  }
}
