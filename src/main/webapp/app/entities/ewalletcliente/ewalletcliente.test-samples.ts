import { IEwalletcliente, NewEwalletcliente } from './ewalletcliente.model';

export const sampleWithRequiredData: IEwalletcliente = {
  id: 6606,
};

export const sampleWithPartialData: IEwalletcliente = {
  id: 55615,
  nombre: 'payment copy',
  idwizpos: 84102,
};

export const sampleWithFullData: IEwalletcliente = {
  id: 12433,
  nombre: 'Account index Refinado',
  idwizpos: 31279,
  datos: 'al transmit',
};

export const sampleWithNewData: NewEwalletcliente = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
