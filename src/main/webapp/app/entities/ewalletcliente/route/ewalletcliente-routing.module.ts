import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EwalletclienteComponent } from '../list/ewalletcliente.component';
import { EwalletclienteDetailComponent } from '../detail/ewalletcliente-detail.component';
import { EwalletclienteUpdateComponent } from '../update/ewalletcliente-update.component';
import { EwalletclienteRoutingResolveService } from './ewalletcliente-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const ewalletclienteRoute: Routes = [
  {
    path: '',
    component: EwalletclienteComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EwalletclienteDetailComponent,
    resolve: {
      ewalletcliente: EwalletclienteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EwalletclienteUpdateComponent,
    resolve: {
      ewalletcliente: EwalletclienteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EwalletclienteUpdateComponent,
    resolve: {
      ewalletcliente: EwalletclienteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ewalletclienteRoute)],
  exports: [RouterModule],
})
export class EwalletclienteRoutingModule {}
