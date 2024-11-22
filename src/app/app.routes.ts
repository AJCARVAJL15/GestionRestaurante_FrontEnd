import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },  {
    path: 'modal2-form-component',
    loadComponent: () => import('./tab2/Modal/modal2-form-component/modal2-form-component.page').then( m => m.Modal2FormComponentPage)
  },

];
