import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TodoItems } from '../../core/models/todo-items';
import { TodoItemsService } from '../../core/services/todo-items.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  todoItems$: Observable<TodoItems[]>;

  constructor(
    private todoItemsService: TodoItemsService) {
  }

  ngOnInit() {
    this.todoItems$ = this.todoItemsService.todoItems$;
  }

}
