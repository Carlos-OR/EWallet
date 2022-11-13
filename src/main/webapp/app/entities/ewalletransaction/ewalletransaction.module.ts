import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EwalletransactionComponent } from './list/ewalletransaction.component';
import { EwalletransactionDetailComponent } from './detail/ewalletransaction-detail.component';
import { EwalletransactionUpdateComponent } from './update/ewalletransaction-update.component';
import { EwalletransactionDeleteDialogComponent } from './delete/ewalletransaction-delete-dialog.component';
import { EwalletransactionRoutingModule } from './route/ewalletransaction-routing.module';

@NgModule({
  imports: [SharedModule, EwalletransactionRoutingModule],
  declarations: [
    EwalletransactionComponent,
    EwalletransactionDetailComponent,
    EwalletransactionUpdateComponent,
    EwalletransactionDeleteDialogComponent,
  ],
})
export class EwalletransactionModule {}
