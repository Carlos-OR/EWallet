export interface IEwalletransaction {
  id: number;
  externalid?: string | null;
  idewalletcliente?: string | null;
  idusercreate?: string | null;
  xapikey?: string | null;
  authorization?: string | null;
  merchantid?: string | null;
  accesstoken?: string | null;
  response?: string | null;
  idautorization?: string | null;
  timecreate?: string | null;
  timeresponse?: string | null;
}

export type NewEwalletransaction = Omit<IEwalletransaction, 'id'> & { id: null };
