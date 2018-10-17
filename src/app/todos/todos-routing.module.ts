import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {TodosComponent} from './todos.component';

const todosRoutes: Routes = [
  { path: '', component: TodosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(todosRoutes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
