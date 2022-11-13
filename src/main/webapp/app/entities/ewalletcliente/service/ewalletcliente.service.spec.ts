import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEwalletcliente } from '../ewalletcliente.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../ewalletcliente.test-samples';

import { EwalletclienteService } from './ewalletcliente.service';

const requireRestSample: IEwalletcliente = {
  ...sampleWithRequiredData,
};

describe('Ewalletcliente Service', () => {
  let service: EwalletclienteService;
  let httpMock: HttpTestingController;
  let expectedResult: IEwalletcliente | IEwalletcliente[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EwalletclienteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Ewalletcliente', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const ewalletcliente = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(ewalletcliente).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Ewalletcliente', () => {
      const ewalletcliente = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(ewalletcliente).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Ewalletcliente', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Ewalletcliente', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Ewalletcliente', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addEwalletclienteToCollectionIfMissing', () => {
      it('should add a Ewalletcliente to an empty array', () => {
        const ewalletcliente: IEwalletcliente = sampleWithRequiredData;
        expectedResult = service.addEwalletclienteToCollectionIfMissing([], ewalletcliente);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ewalletcliente);
      });

      it('should not add a Ewalletcliente to an array that contains it', () => {
        const ewalletcliente: IEwalletcliente = sampleWithRequiredData;
        const ewalletclienteCollection: IEwalletcliente[] = [
          {
            ...ewalletcliente,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addEwalletclienteToCollectionIfMissing(ewalletclienteCollection, ewalletcliente);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Ewalletcliente to an array that doesn't contain it", () => {
        const ewalletcliente: IEwalletcliente = sampleWithRequiredData;
        const ewalletclienteCollection: IEwalletcliente[] = [sampleWithPartialData];
        expectedResult = service.addEwalletclienteToCollectionIfMissing(ewalletclienteCollection, ewalletcliente);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ewalletcliente);
      });

      it('should add only unique Ewalletcliente to an array', () => {
        const ewalletclienteArray: IEwalletcliente[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const ewalletclienteCollection: IEwalletcliente[] = [sampleWithRequiredData];
        expectedResult = service.addEwalletclienteToCollectionIfMissing(ewalletclienteCollection, ...ewalletclienteArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const ewalletcliente: IEwalletcliente = sampleWithRequiredData;
        const ewalletcliente2: IEwalletcliente = sampleWithPartialData;
        expectedResult = service.addEwalletclienteToCollectionIfMissing([], ewalletcliente, ewalletcliente2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ewalletcliente);
        expect(expectedResult).toContain(ewalletcliente2);
      });

      it('should accept null and undefined values', () => {
        const ewalletcliente: IEwalletcliente = sampleWithRequiredData;
        expectedResult = service.addEwalletclienteToCollectionIfMissing([], null, ewalletcliente, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ewalletcliente);
      });

      it('should return initial array if no Ewalletcliente is added', () => {
        const ewalletclienteCollection: IEwalletcliente[] = [sampleWithRequiredData];
        expectedResult = service.addEwalletclienteToCollectionIfMissing(ewalletclienteCollection, undefined, null);
        expect(expectedResult).toEqual(ewalletclienteCollection);
      });
    });

    describe('compareEwalletcliente', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareEwalletcliente(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareEwalletcliente(entity1, entity2);
        const compareResult2 = service.compareEwalletcliente(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareEwalletcliente(entity1, entity2);
        const compareResult2 = service.compareEwalletcliente(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareEwalletcliente(entity1, entity2);
        const compareResult2 = service.compareEwalletcliente(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
