import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoItemsComponent } from './todo-items/todo-items.component';
import { TodosComponent } from './todos.component';


const todosRoutes: Routes = [
  { path: '', component: TodosComponent, children: [
      { path: '', component: TodoItemsComponent},
      { path: 'active', component: TodoItemsComponent},
      { path: 'completed', component: TodoItemsComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(todosRoutes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
