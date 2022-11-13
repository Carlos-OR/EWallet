import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEwalletcliente, NewEwalletcliente } from '../ewalletcliente.model';

export type PartialUpdateEwalletcliente = Partial<IEwalletcliente> & Pick<IEwalletcliente, 'id'>;

export type EntityResponseType = HttpResponse<IEwalletcliente>;
export type EntityArrayResponseType = HttpResponse<IEwalletcliente[]>;

@Injectable({ providedIn: 'root' })
export class EwalletclienteService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/ewalletclientes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(ewalletcliente: NewEwalletcliente): Observable<EntityResponseType> {
    return this.http.post<IEwalletcliente>(this.resourceUrl, ewalletcliente, { observe: 'response' });
  }

  update(ewalletcliente: IEwalletcliente): Observable<EntityResponseType> {
    return this.http.put<IEwalletcliente>(`${this.resourceUrl}/${this.getEwalletclienteIdentifier(ewalletcliente)}`, ewalletcliente, {
      observe: 'response',
    });
  }

  partialUpdate(ewalletcliente: PartialUpdateEwalletcliente): Observable<EntityResponseType> {
    return this.http.patch<IEwalletcliente>(`${this.resourceUrl}/${this.getEwalletclienteIdentifier(ewalletcliente)}`, ewalletcliente, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEwalletcliente>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEwalletcliente[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEwalletclienteIdentifier(ewalletcliente: Pick<IEwalletcliente, 'id'>): number {
    return ewalletcliente.id;
  }

  compareEwalletcliente(o1: Pick<IEwalletcliente, 'id'> | null, o2: Pick<IEwalletcliente, 'id'> | null): boolean {
    return o1 && o2 ? this.getEwalletclienteIdentifier(o1) === this.getEwalletclienteIdentifier(o2) : o1 === o2;
  }

  addEwalletclienteToCollectionIfMissing<Type extends Pick<IEwalletcliente, 'id'>>(
    ewalletclienteCollection: Type[],
    ...ewalletclientesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const ewalletclientes: Type[] = ewalletclientesToCheck.filter(isPresent);
    if (ewalletclientes.length > 0) {
      const ewalletclienteCollectionIdentifiers = ewalletclienteCollection.map(
        ewalletclienteItem => this.getEwalletclienteIdentifier(ewalletclienteItem)!
      );
      const ewalletclientesToAdd = ewalletclientes.filter(ewalletclienteItem => {
        const ewalletclienteIdentifier = this.getEwalletclienteIdentifier(ewalletclienteItem);
        if (ewalletclienteCollectionIdentifiers.includes(ewalletclienteIdentifier)) {
          return false;
        }
        ewalletclienteCollectionIdentifiers.push(ewalletclienteIdentifier);
        return true;
      });
      return [...ewalletclientesToAdd, ...ewalletclienteCollection];
    }
    return ewalletclienteCollection;
  }
}
