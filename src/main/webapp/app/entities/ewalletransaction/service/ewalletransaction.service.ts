import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEwalletransaction, NewEwalletransaction } from '../ewalletransaction.model';

export type PartialUpdateEwalletransaction = Partial<IEwalletransaction> & Pick<IEwalletransaction, 'id'>;

export type EntityResponseType = HttpResponse<IEwalletransaction>;
export type EntityArrayResponseType = HttpResponse<IEwalletransaction[]>;

@Injectable({ providedIn: 'root' })
export class EwalletransactionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/ewalletransactions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(ewalletransaction: NewEwalletransaction): Observable<EntityResponseType> {
    return this.http.post<IEwalletransaction>(this.resourceUrl, ewalletransaction, { observe: 'response' });
  }

  update(ewalletransaction: IEwalletransaction): Observable<EntityResponseType> {
    return this.http.put<IEwalletransaction>(
      `${this.resourceUrl}/${this.getEwalletransactionIdentifier(ewalletransaction)}`,
      ewalletransaction,
      { observe: 'response' }
    );
  }

  partialUpdate(ewalletransaction: PartialUpdateEwalletransaction): Observable<EntityResponseType> {
    return this.http.patch<IEwalletransaction>(
      `${this.resourceUrl}/${this.getEwalletransactionIdentifier(ewalletransaction)}`,
      ewalletransaction,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEwalletransaction>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEwalletransaction[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEwalletransactionIdentifier(ewalletransaction: Pick<IEwalletransaction, 'id'>): number {
    return ewalletransaction.id;
  }

  compareEwalletransaction(o1: Pick<IEwalletransaction, 'id'> | null, o2: Pick<IEwalletransaction, 'id'> | null): boolean {
    return o1 && o2 ? this.getEwalletransactionIdentifier(o1) === this.getEwalletransactionIdentifier(o2) : o1 === o2;
  }

  addEwalletransactionToCollectionIfMissing<Type extends Pick<IEwalletransaction, 'id'>>(
    ewalletransactionCollection: Type[],
    ...ewalletransactionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const ewalletransactions: Type[] = ewalletransactionsToCheck.filter(isPresent);
    if (ewalletransactions.length > 0) {
      const ewalletransactionCollectionIdentifiers = ewalletransactionCollection.map(
        ewalletransactionItem => this.getEwalletransactionIdentifier(ewalletransactionItem)!
      );
      const ewalletransactionsToAdd = ewalletransactions.filter(ewalletransactionItem => {
        const ewalletransactionIdentifier = this.getEwalletransactionIdentifier(ewalletransactionItem);
        if (ewalletransactionCollectionIdentifiers.includes(ewalletransactionIdentifier)) {
          return false;
        }
        ewalletransactionCollectionIdentifiers.push(ewalletransactionIdentifier);
        return true;
      });
      return [...ewalletransactionsToAdd, ...ewalletransactionCollection];
    }
    return ewalletransactionCollection;
  }
}
