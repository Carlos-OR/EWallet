import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../ewalletransaction.test-samples';

import { EwalletransactionFormService } from './ewalletransaction-form.service';

describe('Ewalletransaction Form Service', () => {
  let service: EwalletransactionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EwalletransactionFormService);
  });

  describe('Service methods', () => {
    describe('createEwalletransactionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEwalletransactionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            externalid: expect.any(Object),
            idewalletcliente: expect.any(Object),
            idusercreate: expect.any(Object),
            xapikey: expect.any(Object),
            authorization: expect.any(Object),
            merchantid: expect.any(Object),
            accesstoken: expect.any(Object),
            response: expect.any(Object),
            idautorization: expect.any(Object),
            timecreate: expect.any(Object),
            timeresponse: expect.any(Object),
          })
        );
      });

      it('passing IEwalletransaction should create a new form with FormGroup', () => {
        const formGroup = service.createEwalletransactionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            externalid: expect.any(Object),
            idewalletcliente: expect.any(Object),
            idusercreate: expect.any(Object),
            xapikey: expect.any(Object),
            authorization: expect.any(Object),
            merchantid: expect.any(Object),
            accesstoken: expect.any(Object),
            response: expect.any(Object),
            idautorization: expect.any(Object),
            timecreate: expect.any(Object),
            timeresponse: expect.any(Object),
          })
        );
      });
    });

    describe('getEwalletransaction', () => {
      it('should return NewEwalletransaction for default Ewalletransaction initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEwalletransactionFormGroup(sampleWithNewData);

        const ewalletransaction = service.getEwalletransaction(formGroup) as any;

        expect(ewalletransaction).toMatchObject(sampleWithNewData);
      });

      it('should return NewEwalletransaction for empty Ewalletransaction initial value', () => {
        const formGroup = service.createEwalletransactionFormGroup();

        const ewalletransaction = service.getEwalletransaction(formGroup) as any;

        expect(ewalletransaction).toMatchObject({});
      });

      it('should return IEwalletransaction', () => {
        const formGroup = service.createEwalletransactionFormGroup(sampleWithRequiredData);

        const ewalletransaction = service.getEwalletransaction(formGroup) as any;

        expect(ewalletransaction).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEwalletransaction should not enable id FormControl', () => {
        const formGroup = service.createEwalletransactionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEwalletransaction should disable id FormControl', () => {
        const formGroup = service.createEwalletransactionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
