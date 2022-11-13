import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { EwalletclienteFormService, EwalletclienteFormGroup } from './ewalletcliente-form.service';
import { IEwalletcliente } from '../ewalletcliente.model';
import { EwalletclienteService } from '../service/ewalletcliente.service';
import { IEwalletransaction } from 'app/entities/ewalletransaction/ewalletransaction.model';
import { EwalletransactionService } from 'app/entities/ewalletransaction/service/ewalletransaction.service';

@Component({
  selector: 'jhi-ewalletcliente-update',
  templateUrl: './ewalletcliente-update.component.html',
})
export class EwalletclienteUpdateComponent implements OnInit {
  isSaving = false;
  ewalletcliente: IEwalletcliente | null = null;

  ewalletransactionsSharedCollection: IEwalletransaction[] = [];

  editForm: EwalletclienteFormGroup = this.ewalletclienteFormService.createEwalletclienteFormGroup();

  constructor(
    protected ewalletclienteService: EwalletclienteService,
    protected ewalletclienteFormService: EwalletclienteFormService,
    protected ewalletransactionService: EwalletransactionService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareEwalletransaction = (o1: IEwalletransaction | null, o2: IEwalletransaction | null): boolean =>
    this.ewalletransactionService.compareEwalletransaction(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ewalletcliente }) => {
      this.ewalletcliente = ewalletcliente;
      if (ewalletcliente) {
        this.updateForm(ewalletcliente);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ewalletcliente = this.ewalletclienteFormService.getEwalletcliente(this.editForm);
    if (ewalletcliente.id !== null) {
      this.subscribeToSaveResponse(this.ewalletclienteService.update(ewalletcliente));
    } else {
      this.subscribeToSaveResponse(this.ewalletclienteService.create(ewalletcliente));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEwalletcliente>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(ewalletcliente: IEwalletcliente): void {
    this.ewalletcliente = ewalletcliente;
    this.ewalletclienteFormService.resetForm(this.editForm, ewalletcliente);

    this.ewalletransactionsSharedCollection = this.ewalletransactionService.addEwalletransactionToCollectionIfMissing<IEwalletransaction>(
      this.ewalletransactionsSharedCollection,
      ewalletcliente.idEW
    );
  }

  protected loadRelationshipsOptions(): void {
    this.ewalletransactionService
      .query()
      .pipe(map((res: HttpResponse<IEwalletransaction[]>) => res.body ?? []))
      .pipe(
        map((ewalletransactions: IEwalletransaction[]) =>
          this.ewalletransactionService.addEwalletransactionToCollectionIfMissing<IEwalletransaction>(
            ewalletransactions,
            this.ewalletcliente?.idEW
          )
        )
      )
      .subscribe((ewalletransactions: IEwalletransaction[]) => (this.ewalletransactionsSharedCollection = ewalletransactions));
  }
}
