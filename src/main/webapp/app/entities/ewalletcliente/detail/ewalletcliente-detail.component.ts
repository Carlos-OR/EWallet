import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEwalletcliente } from '../ewalletcliente.model';

@Component({
  selector: 'jhi-ewalletcliente-detail',
  templateUrl: './ewalletcliente-detail.component.html',
})
export class EwalletclienteDetailComponent implements OnInit {
  ewalletcliente: IEwalletcliente | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ewalletcliente }) => {
      this.ewalletcliente = ewalletcliente;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
