import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEwalletuser, NewEwalletuser } from '../ewalletuser.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEwalletuser for edit and NewEwalletuserFormGroupInput for create.
 */
type EwalletuserFormGroupInput = IEwalletuser | PartialWithRequiredKeyOf<NewEwalletuser>;

type EwalletuserFormDefaults = Pick<NewEwalletuser, 'id'>;

type EwalletuserFormGroupContent = {
  id: FormControl<IEwalletuser['id'] | NewEwalletuser['id']>;
  username: FormControl<IEwalletuser['username']>;
  password: FormControl<IEwalletuser['password']>;
  appid: FormControl<IEwalletuser['appid']>;
  apikey: FormControl<IEwalletuser['apikey']>;
};

export type EwalletuserFormGroup = FormGroup<EwalletuserFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EwalletuserFormService {
  createEwalletuserFormGroup(ewalletuser: EwalletuserFormGroupInput = { id: null }): EwalletuserFormGroup {
    const ewalletuserRawValue = {
      ...this.getFormDefaults(),
      ...ewalletuser,
    };
    return new FormGroup<EwalletuserFormGroupContent>({
      id: new FormControl(
        { value: ewalletuserRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      username: new FormControl(ewalletuserRawValue.username),
      password: new FormControl(ewalletuserRawValue.password),
      appid: new FormControl(ewalletuserRawValue.appid),
      apikey: new FormControl(ewalletuserRawValue.apikey),
    });
  }

  getEwalletuser(form: EwalletuserFormGroup): IEwalletuser | NewEwalletuser {
    return form.getRawValue() as IEwalletuser | NewEwalletuser;
  }

  resetForm(form: EwalletuserFormGroup, ewalletuser: EwalletuserFormGroupInput): void {
    const ewalletuserRawValue = { ...this.getFormDefaults(), ...ewalletuser };
    form.reset(
      {
        ...ewalletuserRawValue,
        id: { value: ewalletuserRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EwalletuserFormDefaults {
    return {
      id: null,
    };
  }
}
