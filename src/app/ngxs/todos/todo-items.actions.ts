import { TodoItems } from '../../core/models/todo-items';


export class FetchTodoItems {
  static readonly type = '[Todo Items] Fetch Todo Item';
}

export class FetchTodoItemSuccessfully {
  static readonly type = '[Todo Items] Fetch Todo Item Successfully';

  constructor(public readonly payload: TodoItems[]) {
  }
}

export class FetchTodoItemFailed {
  static readonly type = '[Todo Items] Fetch Todo Item Failed';

  constructor(public readonly payload: any) {
  }
}


export class AddTodoItem {
  static readonly type = '[Header] Add Todo Item';

  constructor(public readonly payload: TodoItems) {
  }
}

export class AddTodoItemSuccessfully {
  static readonly type = '[Todo Items] Add Todo Item Successfully';

  constructor(public readonly payload: TodoItems) {
  }
}

export class AddTodoItemFailed {
  static readonly type = '[Todo Items State] Add Todo Item Failed';

  constructor(public readonly payload: any) {
  }
}


export class DeleteTodoItem {
  static readonly type = '[Todo Items] Delete Todo Item';

  constructor(public readonly payload: TodoItems) {
  }
}

export class DeleteTodoItemSuccessfully {
  static readonly type = '[Todo Items] Delete Todo Item Successfully';

  constructor(public readonly payload: TodoItems) {
  }
}

export class DeleteTodoItemFailed {
  static readonly type = '[Todo Items] Delete Todo Item Failed';

  constructor(public readonly payload: any) {
  }
}


export class ToggleTodoItemsComplete {
  static readonly type = '[Todo Items] Toggle Todo Item Complete';

  constructor(public readonly payload: TodoItems) {
  }
}

export class ToggleTodoItemCompleteSuccessfully {
  static readonly type = '[Todo Items] Toggle Todo Item Complete Successfully';

  constructor(public readonly payload: TodoItems) {
  }
}

export class ToggleTodoItemCompleteFailed {
  static readonly type = '[Todo Items] Toggle Todo Item Complete Failed';

  constructor(public readonly payload: any) {
  }
}
