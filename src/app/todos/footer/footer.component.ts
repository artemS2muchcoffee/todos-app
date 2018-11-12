import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TodoItemsService } from '../../core/services/todo-items.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  count$: Observable<number>;

  constructor(
    private todoItemsService: TodoItemsService
  ) {
  }

  ngOnInit() {
    this.count$ = this.todoItemsService.count$;
  }
}
