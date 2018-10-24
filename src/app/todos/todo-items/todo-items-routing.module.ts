import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoItemsComponent } from './todo-items.component';

const todoItemsRoutes: Routes = [
  {path: '', component: TodoItemsComponent},
  {path: 'active', component: TodoItemsComponent, data: {complete: false}},
  {path: 'completed', component: TodoItemsComponent, data: {complete: true}}
];

@NgModule({
  imports: [RouterModule.forChild(todoItemsRoutes)],
  exports: [RouterModule]
})
export class TodoItemsRoutingModule {
}
