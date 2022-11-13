import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EwalletransactionComponent } from '../list/ewalletransaction.component';
import { EwalletransactionDetailComponent } from '../detail/ewalletransaction-detail.component';
import { EwalletransactionUpdateComponent } from '../update/ewalletransaction-update.component';
import { EwalletransactionRoutingResolveService } from './ewalletransaction-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const ewalletransactionRoute: Routes = [
  {
    path: '',
    component: EwalletransactionComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EwalletransactionDetailComponent,
    resolve: {
      ewalletransaction: EwalletransactionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EwalletransactionUpdateComponent,
    resolve: {
      ewalletransaction: EwalletransactionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EwalletransactionUpdateComponent,
    resolve: {
      ewalletransaction: EwalletransactionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ewalletransactionRoute)],
  exports: [RouterModule],
})
export class EwalletransactionRoutingModule {}
