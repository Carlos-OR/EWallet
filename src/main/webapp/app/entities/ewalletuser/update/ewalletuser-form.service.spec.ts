import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../ewalletuser.test-samples';

import { EwalletuserFormService } from './ewalletuser-form.service';

describe('Ewalletuser Form Service', () => {
  let service: EwalletuserFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EwalletuserFormService);
  });

  describe('Service methods', () => {
    describe('createEwalletuserFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEwalletuserFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            username: expect.any(Object),
            password: expect.any(Object),
            appid: expect.any(Object),
            apikey: expect.any(Object),
          })
        );
      });

      it('passing IEwalletuser should create a new form with FormGroup', () => {
        const formGroup = service.createEwalletuserFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            username: expect.any(Object),
            password: expect.any(Object),
            appid: expect.any(Object),
            apikey: expect.any(Object),
          })
        );
      });
    });

    describe('getEwalletuser', () => {
      it('should return NewEwalletuser for default Ewalletuser initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEwalletuserFormGroup(sampleWithNewData);

        const ewalletuser = service.getEwalletuser(formGroup) as any;

        expect(ewalletuser).toMatchObject(sampleWithNewData);
      });

      it('should return NewEwalletuser for empty Ewalletuser initial value', () => {
        const formGroup = service.createEwalletuserFormGroup();

        const ewalletuser = service.getEwalletuser(formGroup) as any;

        expect(ewalletuser).toMatchObject({});
      });

      it('should return IEwalletuser', () => {
        const formGroup = service.createEwalletuserFormGroup(sampleWithRequiredData);

        const ewalletuser = service.getEwalletuser(formGroup) as any;

        expect(ewalletuser).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEwalletuser should not enable id FormControl', () => {
        const formGroup = service.createEwalletuserFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEwalletuser should disable id FormControl', () => {
        const formGroup = service.createEwalletuserFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
