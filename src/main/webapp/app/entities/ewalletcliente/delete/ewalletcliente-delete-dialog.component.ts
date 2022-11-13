import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEwalletcliente } from '../ewalletcliente.model';
import { EwalletclienteService } from '../service/ewalletcliente.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './ewalletcliente-delete-dialog.component.html',
})
export class EwalletclienteDeleteDialogComponent {
  ewalletcliente?: IEwalletcliente;

  constructor(protected ewalletclienteService: EwalletclienteService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ewalletclienteService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
