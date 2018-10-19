import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { TodoItems } from '../../core/models/todo-items';
import { TodoItemsService } from '../../core/services/todo-items.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  todoItems: TodoItems[];
  itemsSub: Subscription;
  count;

  constructor(private todoItemsService: TodoItemsService) {}

  ngOnInit() {
    this.todoItems = this.todoItemsService.todoItems;

    this.itemsSub = this.todoItemsService.getUpdateTodoItems()
    .subscribe((items: TodoItems[]) => {
      this.todoItems = items;
      this.count = this.todoItems.length;

    });

    this.count = this.todoItems.length;
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }


}
