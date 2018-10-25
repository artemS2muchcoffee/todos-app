import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

import { HttpInterceptorProviders } from './interceptors';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule
  ],
  providers: [
    HttpInterceptorProviders
  ]
})
export class CoreModule {
}
