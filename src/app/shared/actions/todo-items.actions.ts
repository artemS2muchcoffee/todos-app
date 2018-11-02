import { TodoItems } from '../../core/models/todo-items';


export class FetchTodoItems {
  static readonly type = '[Todo Items Component] Fetch Todo Item';
}

export class FetchTodoItemSuccessfully {
  static readonly type = '[Todo Items Component] Fetch Todo Item Successfully';

  constructor(public readonly payload: TodoItems[]) {
  }
}

export class FetchTodoItemFailed {
  static readonly type = '[Todo Items Component] Fetch Todo Item Failed';

  constructor(public readonly payload: any) {
  }
}


export class AddTodoItem {
  static readonly type = '[Header Component] Add Todo Item';

  constructor(public readonly payload: TodoItems) {
  }
}

export class AddTodoItemSuccessfully {
  static readonly type = '[Todo Items State] Add Todo Item Successfully';

  constructor(public readonly payload: TodoItems) {
  }
}

export class AddTodoItemFailed {
  static readonly type = '[Todo Items State] Add Todo Item Failed';

  constructor(public readonly payload: any) {
  }
}


export class DeleteTodoItem {
  static readonly type = '[Todo Items Component] Delete Todo Item';

  constructor(public readonly payload: TodoItems) {
  }
}

export class DeleteTodoItemSuccessfully {
  static readonly type = '[Todo Items State] Delete Todo Item Successfully';

  constructor(public readonly payload: TodoItems) {
  }
}

export class DeleteTodoItemFailed {
  static readonly type = '[Todo Items State] Delete Todo Item Failed';

  constructor(public readonly payload: any) {
  }
}


export class ToggleTodoItemsComplete {
  static readonly type = '[Todo Items Component] Toggle Todo Item Complete';

  constructor(public readonly payload: TodoItems) {
  }
}

export class ToggleTodoItemCompleteSuccessfully {
  static readonly type = '[Todo Items State] Toggle Todo Item Complete Successfully';

  constructor(public readonly payload: TodoItems) {
  }
}

export class ToggleTodoItemCompleteFailed {
  static readonly type = '[Todo Items State] Toggle Todo Item Complete Failed';

  constructor(public readonly payload: any) {
  }
}
