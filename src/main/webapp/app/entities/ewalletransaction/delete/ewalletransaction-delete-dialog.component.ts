import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEwalletransaction } from '../ewalletransaction.model';
import { EwalletransactionService } from '../service/ewalletransaction.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './ewalletransaction-delete-dialog.component.html',
})
export class EwalletransactionDeleteDialogComponent {
  ewalletransaction?: IEwalletransaction;

  constructor(protected ewalletransactionService: EwalletransactionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ewalletransactionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
