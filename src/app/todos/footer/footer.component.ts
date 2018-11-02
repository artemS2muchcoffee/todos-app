import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { TodoItems } from '../../core/models/todo-items';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  todoItems$: Observable<TodoItems[]>;

  constructor(
    private store: Store) {
  }

  ngOnInit() {
    this.todoItems$ = this.store.select(state => state.todoItems.todoItems);
  }

}
