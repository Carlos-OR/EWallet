import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EwalletuserComponent } from '../list/ewalletuser.component';
import { EwalletuserDetailComponent } from '../detail/ewalletuser-detail.component';
import { EwalletuserUpdateComponent } from '../update/ewalletuser-update.component';
import { EwalletuserRoutingResolveService } from './ewalletuser-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const ewalletuserRoute: Routes = [
  {
    path: '',
    component: EwalletuserComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EwalletuserDetailComponent,
    resolve: {
      ewalletuser: EwalletuserRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EwalletuserUpdateComponent,
    resolve: {
      ewalletuser: EwalletuserRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EwalletuserUpdateComponent,
    resolve: {
      ewalletuser: EwalletuserRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ewalletuserRoute)],
  exports: [RouterModule],
})
export class EwalletuserRoutingModule {}
