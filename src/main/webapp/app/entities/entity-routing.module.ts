import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'ewalletuser',
        data: { pageTitle: 'ewalletApp.ewalletuser.home.title' },
        loadChildren: () => import('./ewalletuser/ewalletuser.module').then(m => m.EwalletuserModule),
      },
      {
        path: 'ewalletcliente',
        data: { pageTitle: 'ewalletApp.ewalletcliente.home.title' },
        loadChildren: () => import('./ewalletcliente/ewalletcliente.module').then(m => m.EwalletclienteModule),
      },
      {
        path: 'ewalletransaction',
        data: { pageTitle: 'ewalletApp.ewalletransaction.home.title' },
        loadChildren: () => import('./ewalletransaction/ewalletransaction.module').then(m => m.EwalletransactionModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
