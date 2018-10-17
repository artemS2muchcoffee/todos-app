import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TodosComponent} from './todos.component';
import {HeaderComponent} from './header/header.component';

const todosRoutes: Routes = [
  { path: '', component: TodosComponent, children: [
      // { path: '', component: HeaderComponent},
      // { path: '', component}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(todosRoutes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
