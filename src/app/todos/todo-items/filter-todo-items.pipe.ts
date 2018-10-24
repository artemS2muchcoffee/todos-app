import { Pipe, PipeTransform } from '@angular/core';

import { TodoItems } from '../../core/models/todo-items';

@Pipe({
  name: 'filterTodoItemsPipe',
})
export class FilterTodoItemsPipe implements PipeTransform {

  transform(value: TodoItems[], route: boolean): any {
    if (!value) {
      return value;
    }
    return value.filter(
      item => route === undefined || route === item.complete
    );
  }
}
