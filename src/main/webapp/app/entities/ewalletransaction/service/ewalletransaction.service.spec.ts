import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEwalletransaction } from '../ewalletransaction.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../ewalletransaction.test-samples';

import { EwalletransactionService } from './ewalletransaction.service';

const requireRestSample: IEwalletransaction = {
  ...sampleWithRequiredData,
};

describe('Ewalletransaction Service', () => {
  let service: EwalletransactionService;
  let httpMock: HttpTestingController;
  let expectedResult: IEwalletransaction | IEwalletransaction[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EwalletransactionService);
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

    it('should create a Ewalletransaction', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const ewalletransaction = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(ewalletransaction).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Ewalletransaction', () => {
      const ewalletransaction = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(ewalletransaction).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Ewalletransaction', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Ewalletransaction', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Ewalletransaction', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addEwalletransactionToCollectionIfMissing', () => {
      it('should add a Ewalletransaction to an empty array', () => {
        const ewalletransaction: IEwalletransaction = sampleWithRequiredData;
        expectedResult = service.addEwalletransactionToCollectionIfMissing([], ewalletransaction);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ewalletransaction);
      });

      it('should not add a Ewalletransaction to an array that contains it', () => {
        const ewalletransaction: IEwalletransaction = sampleWithRequiredData;
        const ewalletransactionCollection: IEwalletransaction[] = [
          {
            ...ewalletransaction,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addEwalletransactionToCollectionIfMissing(ewalletransactionCollection, ewalletransaction);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Ewalletransaction to an array that doesn't contain it", () => {
        const ewalletransaction: IEwalletransaction = sampleWithRequiredData;
        const ewalletransactionCollection: IEwalletransaction[] = [sampleWithPartialData];
        expectedResult = service.addEwalletransactionToCollectionIfMissing(ewalletransactionCollection, ewalletransaction);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ewalletransaction);
      });

      it('should add only unique Ewalletransaction to an array', () => {
        const ewalletransactionArray: IEwalletransaction[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const ewalletransactionCollection: IEwalletransaction[] = [sampleWithRequiredData];
        expectedResult = service.addEwalletransactionToCollectionIfMissing(ewalletransactionCollection, ...ewalletransactionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const ewalletransaction: IEwalletransaction = sampleWithRequiredData;
        const ewalletransaction2: IEwalletransaction = sampleWithPartialData;
        expectedResult = service.addEwalletransactionToCollectionIfMissing([], ewalletransaction, ewalletransaction2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ewalletransaction);
        expect(expectedResult).toContain(ewalletransaction2);
      });

      it('should accept null and undefined values', () => {
        const ewalletransaction: IEwalletransaction = sampleWithRequiredData;
        expectedResult = service.addEwalletransactionToCollectionIfMissing([], null, ewalletransaction, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ewalletransaction);
      });

      it('should return initial array if no Ewalletransaction is added', () => {
        const ewalletransactionCollection: IEwalletransaction[] = [sampleWithRequiredData];
        expectedResult = service.addEwalletransactionToCollectionIfMissing(ewalletransactionCollection, undefined, null);
        expect(expectedResult).toEqual(ewalletransactionCollection);
      });
    });

    describe('compareEwalletransaction', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareEwalletransaction(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareEwalletransaction(entity1, entity2);
        const compareResult2 = service.compareEwalletransaction(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareEwalletransaction(entity1, entity2);
        const compareResult2 = service.compareEwalletransaction(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareEwalletransaction(entity1, entity2);
        const compareResult2 = service.compareEwalletransaction(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
