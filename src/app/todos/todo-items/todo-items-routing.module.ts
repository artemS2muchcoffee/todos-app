import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const todoItemsRoutes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(todoItemsRoutes)],
  exports: [RouterModule]
})
export class TodoItemsRoutingModule { }
