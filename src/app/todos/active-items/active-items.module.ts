import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ActiveItemsComponent } from './active-items.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ActiveItemsComponent],
  exports: [ActiveItemsComponent]
})
export class ActiveItemsModule { }
