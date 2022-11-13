import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEwalletransaction, NewEwalletransaction } from '../ewalletransaction.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEwalletransaction for edit and NewEwalletransactionFormGroupInput for create.
 */
type EwalletransactionFormGroupInput = IEwalletransaction | PartialWithRequiredKeyOf<NewEwalletransaction>;

type EwalletransactionFormDefaults = Pick<NewEwalletransaction, 'id'>;

type EwalletransactionFormGroupContent = {
  id: FormControl<IEwalletransaction['id'] | NewEwalletransaction['id']>;
  externalid: FormControl<IEwalletransaction['externalid']>;
  idewalletcliente: FormControl<IEwalletransaction['idewalletcliente']>;
  idusercreate: FormControl<IEwalletransaction['idusercreate']>;
  xapikey: FormControl<IEwalletransaction['xapikey']>;
  authorization: FormControl<IEwalletransaction['authorization']>;
  merchantid: FormControl<IEwalletransaction['merchantid']>;
  accesstoken: FormControl<IEwalletransaction['accesstoken']>;
  response: FormControl<IEwalletransaction['response']>;
  idautorization: FormControl<IEwalletransaction['idautorization']>;
  timecreate: FormControl<IEwalletransaction['timecreate']>;
  timeresponse: FormControl<IEwalletransaction['timeresponse']>;
};

export type EwalletransactionFormGroup = FormGroup<EwalletransactionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EwalletransactionFormService {
  createEwalletransactionFormGroup(ewalletransaction: EwalletransactionFormGroupInput = { id: null }): EwalletransactionFormGroup {
    const ewalletransactionRawValue = {
      ...this.getFormDefaults(),
      ...ewalletransaction,
    };
    return new FormGroup<EwalletransactionFormGroupContent>({
      id: new FormControl(
        { value: ewalletransactionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      externalid: new FormControl(ewalletransactionRawValue.externalid),
      idewalletcliente: new FormControl(ewalletransactionRawValue.idewalletcliente),
      idusercreate: new FormControl(ewalletransactionRawValue.idusercreate),
      xapikey: new FormControl(ewalletransactionRawValue.xapikey),
      authorization: new FormControl(ewalletransactionRawValue.authorization),
      merchantid: new FormControl(ewalletransactionRawValue.merchantid),
      accesstoken: new FormControl(ewalletransactionRawValue.accesstoken),
      response: new FormControl(ewalletransactionRawValue.response),
      idautorization: new FormControl(ewalletransactionRawValue.idautorization),
      timecreate: new FormControl(ewalletransactionRawValue.timecreate),
      timeresponse: new FormControl(ewalletransactionRawValue.timeresponse),
    });
  }

  getEwalletransaction(form: EwalletransactionFormGroup): IEwalletransaction | NewEwalletransaction {
    return form.getRawValue() as IEwalletransaction | NewEwalletransaction;
  }

  resetForm(form: EwalletransactionFormGroup, ewalletransaction: EwalletransactionFormGroupInput): void {
    const ewalletransactionRawValue = { ...this.getFormDefaults(), ...ewalletransaction };
    form.reset(
      {
        ...ewalletransactionRawValue,
        id: { value: ewalletransactionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EwalletransactionFormDefaults {
    return {
      id: null,
    };
  }
}
