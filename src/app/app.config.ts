import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
   provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes,withInMemoryScrolling({scrollPositionRestoration:'top'}),withViewTransitions()),
    provideHttpClient(withFetch()),
  ]
};
