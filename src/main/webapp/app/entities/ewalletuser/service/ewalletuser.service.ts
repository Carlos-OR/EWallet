import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEwalletuser, NewEwalletuser } from '../ewalletuser.model';

export type PartialUpdateEwalletuser = Partial<IEwalletuser> & Pick<IEwalletuser, 'id'>;

export type EntityResponseType = HttpResponse<IEwalletuser>;
export type EntityArrayResponseType = HttpResponse<IEwalletuser[]>;

@Injectable({ providedIn: 'root' })
export class EwalletuserService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/ewalletusers');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(ewalletuser: NewEwalletuser): Observable<EntityResponseType> {
    return this.http.post<IEwalletuser>(this.resourceUrl, ewalletuser, { observe: 'response' });
  }

  update(ewalletuser: IEwalletuser): Observable<EntityResponseType> {
    return this.http.put<IEwalletuser>(`${this.resourceUrl}/${this.getEwalletuserIdentifier(ewalletuser)}`, ewalletuser, {
      observe: 'response',
    });
  }

  partialUpdate(ewalletuser: PartialUpdateEwalletuser): Observable<EntityResponseType> {
    return this.http.patch<IEwalletuser>(`${this.resourceUrl}/${this.getEwalletuserIdentifier(ewalletuser)}`, ewalletuser, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEwalletuser>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEwalletuser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEwalletuserIdentifier(ewalletuser: Pick<IEwalletuser, 'id'>): number {
    return ewalletuser.id;
  }

  compareEwalletuser(o1: Pick<IEwalletuser, 'id'> | null, o2: Pick<IEwalletuser, 'id'> | null): boolean {
    return o1 && o2 ? this.getEwalletuserIdentifier(o1) === this.getEwalletuserIdentifier(o2) : o1 === o2;
  }

  addEwalletuserToCollectionIfMissing<Type extends Pick<IEwalletuser, 'id'>>(
    ewalletuserCollection: Type[],
    ...ewalletusersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const ewalletusers: Type[] = ewalletusersToCheck.filter(isPresent);
    if (ewalletusers.length > 0) {
      const ewalletuserCollectionIdentifiers = ewalletuserCollection.map(
        ewalletuserItem => this.getEwalletuserIdentifier(ewalletuserItem)!
      );
      const ewalletusersToAdd = ewalletusers.filter(ewalletuserItem => {
        const ewalletuserIdentifier = this.getEwalletuserIdentifier(ewalletuserItem);
        if (ewalletuserCollectionIdentifiers.includes(ewalletuserIdentifier)) {
          return false;
        }
        ewalletuserCollectionIdentifiers.push(ewalletuserIdentifier);
        return true;
      });
      return [...ewalletusersToAdd, ...ewalletuserCollection];
    }
    return ewalletuserCollection;
  }
}
