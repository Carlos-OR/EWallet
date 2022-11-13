import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEwalletuser } from '../ewalletuser.model';
import { EwalletuserService } from '../service/ewalletuser.service';

@Injectable({ providedIn: 'root' })
export class EwalletuserRoutingResolveService implements Resolve<IEwalletuser | null> {
  constructor(protected service: EwalletuserService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEwalletuser | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((ewalletuser: HttpResponse<IEwalletuser>) => {
          if (ewalletuser.body) {
            return of(ewalletuser.body);
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
