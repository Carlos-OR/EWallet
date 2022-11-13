import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEwalletuser } from '../ewalletuser.model';
import { EwalletuserService } from '../service/ewalletuser.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './ewalletuser-delete-dialog.component.html',
})
export class EwalletuserDeleteDialogComponent {
  ewalletuser?: IEwalletuser;

  constructor(protected ewalletuserService: EwalletuserService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ewalletuserService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
