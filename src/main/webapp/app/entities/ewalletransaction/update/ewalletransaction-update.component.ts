import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { EwalletransactionFormService, EwalletransactionFormGroup } from './ewalletransaction-form.service';
import { IEwalletransaction } from '../ewalletransaction.model';
import { EwalletransactionService } from '../service/ewalletransaction.service';

@Component({
  selector: 'jhi-ewalletransaction-update',
  templateUrl: './ewalletransaction-update.component.html',
})
export class EwalletransactionUpdateComponent implements OnInit {
  isSaving = false;
  ewalletransaction: IEwalletransaction | null = null;

  editForm: EwalletransactionFormGroup = this.ewalletransactionFormService.createEwalletransactionFormGroup();

  constructor(
    protected ewalletransactionService: EwalletransactionService,
    protected ewalletransactionFormService: EwalletransactionFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ewalletransaction }) => {
      this.ewalletransaction = ewalletransaction;
      if (ewalletransaction) {
        this.updateForm(ewalletransaction);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ewalletransaction = this.ewalletransactionFormService.getEwalletransaction(this.editForm);
    if (ewalletransaction.id !== null) {
      this.subscribeToSaveResponse(this.ewalletransactionService.update(ewalletransaction));
    } else {
      this.subscribeToSaveResponse(this.ewalletransactionService.create(ewalletransaction));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEwalletransaction>>): void {
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

  protected updateForm(ewalletransaction: IEwalletransaction): void {
    this.ewalletransaction = ewalletransaction;
    this.ewalletransactionFormService.resetForm(this.editForm, ewalletransaction);
  }
}
