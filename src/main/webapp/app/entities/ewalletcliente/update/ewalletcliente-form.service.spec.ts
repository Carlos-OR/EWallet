import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../ewalletcliente.test-samples';

import { EwalletclienteFormService } from './ewalletcliente-form.service';

describe('Ewalletcliente Form Service', () => {
  let service: EwalletclienteFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EwalletclienteFormService);
  });

  describe('Service methods', () => {
    describe('createEwalletclienteFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEwalletclienteFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombre: expect.any(Object),
            idwizpos: expect.any(Object),
            datos: expect.any(Object),
            idEW: expect.any(Object),
          })
        );
      });

      it('passing IEwalletcliente should create a new form with FormGroup', () => {
        const formGroup = service.createEwalletclienteFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombre: expect.any(Object),
            idwizpos: expect.any(Object),
            datos: expect.any(Object),
            idEW: expect.any(Object),
          })
        );
      });
    });

    describe('getEwalletcliente', () => {
      it('should return NewEwalletcliente for default Ewalletcliente initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEwalletclienteFormGroup(sampleWithNewData);

        const ewalletcliente = service.getEwalletcliente(formGroup) as any;

        expect(ewalletcliente).toMatchObject(sampleWithNewData);
      });

      it('should return NewEwalletcliente for empty Ewalletcliente initial value', () => {
        const formGroup = service.createEwalletclienteFormGroup();

        const ewalletcliente = service.getEwalletcliente(formGroup) as any;

        expect(ewalletcliente).toMatchObject({});
      });

      it('should return IEwalletcliente', () => {
        const formGroup = service.createEwalletclienteFormGroup(sampleWithRequiredData);

        const ewalletcliente = service.getEwalletcliente(formGroup) as any;

        expect(ewalletcliente).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEwalletcliente should not enable id FormControl', () => {
        const formGroup = service.createEwalletclienteFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEwalletcliente should disable id FormControl', () => {
        const formGroup = service.createEwalletclienteFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
