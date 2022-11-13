import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EwalletuserComponent } from './list/ewalletuser.component';
import { EwalletuserDetailComponent } from './detail/ewalletuser-detail.component';
import { EwalletuserUpdateComponent } from './update/ewalletuser-update.component';
import { EwalletuserDeleteDialogComponent } from './delete/ewalletuser-delete-dialog.component';
import { EwalletuserRoutingModule } from './route/ewalletuser-routing.module';

@NgModule({
  imports: [SharedModule, EwalletuserRoutingModule],
  declarations: [EwalletuserComponent, EwalletuserDetailComponent, EwalletuserUpdateComponent, EwalletuserDeleteDialogComponent],
})
export class EwalletuserModule {}
