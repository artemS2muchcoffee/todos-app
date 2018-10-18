import { Component, OnInit } from '@angular/core';

import { TodoItems } from '../../core/models/todo-items';
import { TodoItemsService } from '../../core/services/todo-items.service';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.scss']
})
export class AllItemsComponent implements OnInit {
  todoItems: TodoItems[];

  constructor( private todoItemsService: TodoItemsService ) {}

  ngOnInit() {
    this.todoItems = this.todoItemsService.todoItems;
  }
}
