import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterTodoItemsPipe',
})
export class FilterTodoItemsPipe implements PipeTransform {

  transform(value: any, route: string, completed: string): any {
    const resultArray = [];
    for (const item of value) {
      if (route === '') {
        return value;
      }
      if (route === 'active' && item[completed] === false  ) {
        resultArray.push(item);
      }
      if (route === 'completed' && item[completed] === true  ) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
