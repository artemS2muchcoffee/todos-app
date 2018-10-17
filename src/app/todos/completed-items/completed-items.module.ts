import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CompletedItemsComponent } from './completed-items.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CompletedItemsComponent],
  exports: [CompletedItemsComponent]
})
export class CompletedItemsModule { }
