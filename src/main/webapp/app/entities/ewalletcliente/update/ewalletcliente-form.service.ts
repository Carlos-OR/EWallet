import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEwalletcliente, NewEwalletcliente } from '../ewalletcliente.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEwalletcliente for edit and NewEwalletclienteFormGroupInput for create.
 */
type EwalletclienteFormGroupInput = IEwalletcliente | PartialWithRequiredKeyOf<NewEwalletcliente>;

type EwalletclienteFormDefaults = Pick<NewEwalletcliente, 'id'>;

type EwalletclienteFormGroupContent = {
  id: FormControl<IEwalletcliente['id'] | NewEwalletcliente['id']>;
  nombre: FormControl<IEwalletcliente['nombre']>;
  idwizpos: FormControl<IEwalletcliente['idwizpos']>;
  datos: FormControl<IEwalletcliente['datos']>;
  idEW: FormControl<IEwalletcliente['idEW']>;
};

export type EwalletclienteFormGroup = FormGroup<EwalletclienteFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EwalletclienteFormService {
  createEwalletclienteFormGroup(ewalletcliente: EwalletclienteFormGroupInput = { id: null }): EwalletclienteFormGroup {
    const ewalletclienteRawValue = {
      ...this.getFormDefaults(),
      ...ewalletcliente,
    };
    return new FormGroup<EwalletclienteFormGroupContent>({
      id: new FormControl(
        { value: ewalletclienteRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nombre: new FormControl(ewalletclienteRawValue.nombre),
      idwizpos: new FormControl(ewalletclienteRawValue.idwizpos),
      datos: new FormControl(ewalletclienteRawValue.datos),
      idEW: new FormControl(ewalletclienteRawValue.idEW),
    });
  }

  getEwalletcliente(form: EwalletclienteFormGroup): IEwalletcliente | NewEwalletcliente {
    return form.getRawValue() as IEwalletcliente | NewEwalletcliente;
  }

  resetForm(form: EwalletclienteFormGroup, ewalletcliente: EwalletclienteFormGroupInput): void {
    const ewalletclienteRawValue = { ...this.getFormDefaults(), ...ewalletcliente };
    form.reset(
      {
        ...ewalletclienteRawValue,
        id: { value: ewalletclienteRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EwalletclienteFormDefaults {
    return {
      id: null,
    };
  }
}
