import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ActiveItemsModule } from './active-items/active-items.module';
import { AllItemsModule } from './all-items/all-items.module';
import { CompletedItemsModule } from './completed-items/completed-items.module';
import {FooterModule} from './footer/footer.module';
import {HeaderModule} from './header/header.module';
import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './todos.component';

@NgModule({
  declarations: [
    TodosComponent
  ],
  imports: [
    CommonModule,
    TodosRoutingModule,
    HeaderModule,
    FooterModule,
    AllItemsModule,
    ActiveItemsModule,
    CompletedItemsModule
  ]

})
export class TodosModule { }
