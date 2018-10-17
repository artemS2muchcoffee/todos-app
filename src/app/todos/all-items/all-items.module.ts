import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AllItemsComponent } from './all-items.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AllItemsComponent],
  exports: [AllItemsComponent]
})
export class AllItemsModule { }
