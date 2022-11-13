import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { EwalletuserFormService, EwalletuserFormGroup } from './ewalletuser-form.service';
import { IEwalletuser } from '../ewalletuser.model';
import { EwalletuserService } from '../service/ewalletuser.service';

@Component({
  selector: 'jhi-ewalletuser-update',
  templateUrl: './ewalletuser-update.component.html',
})
export class EwalletuserUpdateComponent implements OnInit {
  isSaving = false;
  ewalletuser: IEwalletuser | null = null;

  editForm: EwalletuserFormGroup = this.ewalletuserFormService.createEwalletuserFormGroup();

  constructor(
    protected ewalletuserService: EwalletuserService,
    protected ewalletuserFormService: EwalletuserFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ewalletuser }) => {
      this.ewalletuser = ewalletuser;
      if (ewalletuser) {
        this.updateForm(ewalletuser);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ewalletuser = this.ewalletuserFormService.getEwalletuser(this.editForm);
    if (ewalletuser.id !== null) {
      this.subscribeToSaveResponse(this.ewalletuserService.update(ewalletuser));
    } else {
      this.subscribeToSaveResponse(this.ewalletuserService.create(ewalletuser));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEwalletuser>>): void {
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

  protected updateForm(ewalletuser: IEwalletuser): void {
    this.ewalletuser = ewalletuser;
    this.ewalletuserFormService.resetForm(this.editForm, ewalletuser);
  }
}
