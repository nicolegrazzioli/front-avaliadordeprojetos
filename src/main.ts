import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
//1o arquivo executado
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
