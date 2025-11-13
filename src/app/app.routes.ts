import { Routes } from '@angular/router';

//diz qual componente carregar pela url

export const routes: Routes = [
  {
    path: '', //rota padrao (localhost:4200)
    loadChildren: ()=> //lazy loading
      import('../modules/root/root-module').then(m => m.RootModule)
  },
];
