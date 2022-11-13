import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEwalletcliente } from '../ewalletcliente.model';
import { EwalletclienteService } from '../service/ewalletcliente.service';

@Injectable({ providedIn: 'root' })
export class EwalletclienteRoutingResolveService implements Resolve<IEwalletcliente | null> {
  constructor(protected service: EwalletclienteService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEwalletcliente | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((ewalletcliente: HttpResponse<IEwalletcliente>) => {
          if (ewalletcliente.body) {
            return of(ewalletcliente.body);
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
