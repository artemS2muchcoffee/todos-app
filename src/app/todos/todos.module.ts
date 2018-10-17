import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosRoutingModule } from './todos-routing.module';

import { TodosComponent } from './todos.component';
// import { HeaderModule } from './header/header.module';
// import { FooterModule } from './footer/footer.module';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    TodosRoutingModule
  ],
  declarations: [
    TodosComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class TodosModule { }
