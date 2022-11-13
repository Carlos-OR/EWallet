export interface IEwalletuser {
  id: number;
  username?: string | null;
  password?: string | null;
  appid?: string | null;
  apikey?: string | null;
}

export type NewEwalletuser = Omit<IEwalletuser, 'id'> & { id: null };
