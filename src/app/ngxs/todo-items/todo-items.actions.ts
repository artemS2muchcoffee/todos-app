import { HttpErrorResponse } from '@angular/common/http';

import { TodoItem } from '../../core/models/todo-item';

export class FetchTodoItems {
  static readonly type = '[Todo Items] Fetch Todo Item';
}

export class FetchTodoItemSuccessfully {
  static readonly type = '[Todo Items] Fetch Todo Item Successfully';

  constructor(
    public readonly payload: TodoItem[]
  ) {
  }
}

export class FetchTodoItemFailed {
  static readonly type = '[Todo Items] Fetch Todo Item Failed';

  constructor(
    public readonly payload: HttpErrorResponse
  ) {
  }
}
