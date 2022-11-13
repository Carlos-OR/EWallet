import { IEwalletuser, NewEwalletuser } from './ewalletuser.model';

export const sampleWithRequiredData: IEwalletuser = {
  id: 72907,
};

export const sampleWithPartialData: IEwalletuser = {
  id: 66469,
  username: 'Manzana benchmark parsing',
};

export const sampleWithFullData: IEwalletuser = {
  id: 48080,
  username: 'system deploy Home',
  password: 'Videojuegos drive',
  appid: 'Acero Persistente',
  apikey: 'Navarra withdrawal',
};

export const sampleWithNewData: NewEwalletuser = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
