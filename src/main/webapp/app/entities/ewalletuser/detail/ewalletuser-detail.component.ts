import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEwalletuser } from '../ewalletuser.model';

@Component({
  selector: 'jhi-ewalletuser-detail',
  templateUrl: './ewalletuser-detail.component.html',
})
export class EwalletuserDetailComponent implements OnInit {
  ewalletuser: IEwalletuser | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ewalletuser }) => {
      this.ewalletuser = ewalletuser;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
