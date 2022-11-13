import { IEwalletransaction, NewEwalletransaction } from './ewalletransaction.model';

export const sampleWithRequiredData: IEwalletransaction = {
  id: 38170,
};

export const sampleWithPartialData: IEwalletransaction = {
  id: 79963,
  externalid: 'Account Actualizable',
  idewalletcliente: 'Puerta Aragón',
  xapikey: 'de HTTP streamline',
  merchantid: 'Central partnerships',
  idautorization: 'Sabroso Cantabria withdrawal',
  timecreate: 'withdrawal',
  timeresponse: 'JBOD utilize programming',
};

export const sampleWithFullData: IEwalletransaction = {
  id: 53532,
  externalid: 'primary auxiliary',
  idewalletcliente: 'Buckinghamshire networks Mercados',
  idusercreate: 'Camiseta EXE Refinado',
  xapikey: 'Baleares THX port',
  authorization: 'firmware generating implement',
  merchantid: 'Negro',
  accesstoken: 'Planificador',
  response: 'Integrado networks',
  idautorization: 'index Quinta synergies',
  timecreate: 'Berkshire',
  timeresponse: 'digital',
};

export const sampleWithNewData: NewEwalletransaction = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
