import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  Provider,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {env} from '../environment/enviorenment';

//configura a aplicaçao inteira

export const ENV: Provider = {
  provide: 'ENV',
  useValue: env
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), //registra as rotas
    provideHttpClient(), //para requisiçoes http (chamadas a uma API)
    ENV //disponibiliza variaveis de ambiente - pega objeto ENV e torna injetavel
  ]
};
