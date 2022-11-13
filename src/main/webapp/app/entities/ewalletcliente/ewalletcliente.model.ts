import { IEwalletransaction } from 'app/entities/ewalletransaction/ewalletransaction.model';

export interface IEwalletcliente {
  id: number;
  nombre?: string | null;
  idwizpos?: number | null;
  datos?: string | null;
  idEW?: Pick<IEwalletransaction, 'id'> | null;
}

export type NewEwalletcliente = Omit<IEwalletcliente, 'id'> & { id: null };
