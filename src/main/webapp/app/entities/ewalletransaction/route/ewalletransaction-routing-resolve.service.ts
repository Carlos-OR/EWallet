import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEwalletransaction } from '../ewalletransaction.model';
import { EwalletransactionService } from '../service/ewalletransaction.service';

@Injectable({ providedIn: 'root' })
export class EwalletransactionRoutingResolveService implements Resolve<IEwalletransaction | null> {
  constructor(protected service: EwalletransactionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEwalletransaction | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((ewalletransaction: HttpResponse<IEwalletransaction>) => {
          if (ewalletransaction.body) {
            return of(ewalletransaction.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
