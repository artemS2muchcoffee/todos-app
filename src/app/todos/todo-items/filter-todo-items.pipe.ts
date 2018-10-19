import {Pipe, PipeTransform} from '@angular/core';
import {Router} from '@angular/router';

@Pipe({
  name: 'filterTodoItemsPipe',
})
export class FilterTodoItemsPipe implements PipeTransform {
  constructor(private route: Router) {}

  transform(value: any, completed: string): any {
    const resultArray = [];
    for (const item of value) {
      if (this.route.url === '/') {
        return value;
      }
      if (this.route.url === '/active' && item[completed] === false  ) {
        resultArray.push(item);
      }
      if (this.route.url === '/completed' && item[completed] === true  ) {
        resultArray.push(item);
      }
    }

    return resultArray;

  }
}
