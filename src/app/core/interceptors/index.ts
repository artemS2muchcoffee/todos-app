import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiUrlInterceptor } from './api-url.interceptor';

export const HttpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true}
];
