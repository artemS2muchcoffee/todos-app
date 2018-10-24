import { Pipe, PipeTransform } from '@angular/core';

import { TodoItems } from '../../core/models/todo-items';

@Pipe({
  name: 'filterTodoItems',
})
export class FilterTodoItemsPipe implements PipeTransform {

  transform(value: TodoItems[], complete: boolean): any {
    if (value.length === 0) {
      return value;
    }
    return value.filter(
      item => complete === undefined || complete === item.complete
    );
  }
}
