import { Component, DoCheck, OnInit } from '@angular/core';

import { TodoItemsService } from '../../core/services/todo-items.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, DoCheck {
  count;

  constructor(
    private todoItemsService: TodoItemsService) {
  }

  ngOnInit() {
    this.count = this.todoItemsService.todoItems.length;
  }

  ngDoCheck() {
    this.count = this.todoItemsService.todoItems.length;
  }


}
