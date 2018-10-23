import { Pipe, PipeTransform } from '@angular/core';

import { TodoItems } from '../../core/models/todo-items';

@Pipe({
  name: 'filterTodoItemsPipe',
})
export class FilterTodoItemsPipe implements PipeTransform {

  transform(value: TodoItems[], route: string): any {
    if (!value) {
      return value;
    }
    return value.filter(
      item => route === '' || route === 'active' && item.complete === false || route === 'completed' && item.complete === true
    );
  }
}
