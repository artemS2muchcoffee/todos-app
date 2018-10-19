import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TodoItems } from '../../core/models/todo-items';
import { TodoItemsService } from '../../core/services/todo-items.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent implements OnInit, OnDestroy {
  todoItems: TodoItems[];
  itemsSub: Subscription;
  data;

  constructor(private todoItemsService: TodoItemsService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.todoItems = this.todoItemsService.todoItems;
    this.data = this.route.snapshot.data.value;

    this.itemsSub = this.todoItemsService.getUpdateTodoItems()
    .subscribe((items: TodoItems[]) => {
      this.todoItems = items;
    });
  }

  deleteTodoItemById(itemId: number) {
    this.todoItemsService.deleteTodoItemById(itemId);
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }
}
