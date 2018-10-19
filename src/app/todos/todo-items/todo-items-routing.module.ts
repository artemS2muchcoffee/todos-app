import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoItemsComponent } from './todo-items.component';

const todoItemsRoutes: Routes = [
  { path: '', component: TodoItemsComponent},
  { path: 'active', component: TodoItemsComponent},
  { path: 'completed', component: TodoItemsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(todoItemsRoutes)],
  exports: [RouterModule]
})
export class TodoItemsRoutingModule { }
