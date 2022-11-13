import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEwalletransaction } from '../ewalletransaction.model';

@Component({
  selector: 'jhi-ewalletransaction-detail',
  templateUrl: './ewalletransaction-detail.component.html',
})
export class EwalletransactionDetailComponent implements OnInit {
  ewalletransaction: IEwalletransaction | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ewalletransaction }) => {
      this.ewalletransaction = ewalletransaction;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
