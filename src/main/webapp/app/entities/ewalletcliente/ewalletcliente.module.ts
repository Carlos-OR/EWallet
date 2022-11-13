import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EwalletclienteComponent } from './list/ewalletcliente.component';
import { EwalletclienteDetailComponent } from './detail/ewalletcliente-detail.component';
import { EwalletclienteUpdateComponent } from './update/ewalletcliente-update.component';
import { EwalletclienteDeleteDialogComponent } from './delete/ewalletcliente-delete-dialog.component';
import { EwalletclienteRoutingModule } from './route/ewalletcliente-routing.module';

@NgModule({
  imports: [SharedModule, EwalletclienteRoutingModule],
  declarations: [
    EwalletclienteComponent,
    EwalletclienteDetailComponent,
    EwalletclienteUpdateComponent,
    EwalletclienteDeleteDialogComponent,
  ],
})
export class EwalletclienteModule {}
