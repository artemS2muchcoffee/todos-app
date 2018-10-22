import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoItemsComponent } from './todo-items.component';

const todoItemsRoutes: Routes = [
  { path: '', component: TodoItemsComponent, data: {path: ''}},
  { path: 'active', component: TodoItemsComponent, data: {path: 'active'}},
  { path: 'completed', component: TodoItemsComponent, data: {path: 'completed'}}
];

@NgModule({
  imports: [RouterModule.forChild(todoItemsRoutes)],
  exports: [RouterModule]
})
export class TodoItemsRoutingModule { }
