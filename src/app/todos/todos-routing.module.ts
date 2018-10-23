import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodosComponent } from './todos.component';


const todosRoutes: Routes = [
  {
    path: '', component: TodosComponent,
    children: [
      {path: '', loadChildren: './todo-items/todo-items.module#TodoItemsModule'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(todosRoutes)],
  exports: [RouterModule]
})
export class TodosRoutingModule {
}
