import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActiveItemsComponent } from './active-items/active-items.component';
import { AllItemsComponent } from './all-items/all-items.component';
import { CompletedItemsComponent } from './completed-items/completed-items.component';
import {TodosComponent} from './todos.component';

const todosRoutes: Routes = [
  { path: '', component: TodosComponent, children: [
      {path: '', component: AllItemsComponent},
      {path: 'active', component: ActiveItemsComponent},
      {path: 'completed', component: CompletedItemsComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(todosRoutes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
