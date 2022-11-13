import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEwalletuser } from '../ewalletuser.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../ewalletuser.test-samples';

import { EwalletuserService } from './ewalletuser.service';

const requireRestSample: IEwalletuser = {
  ...sampleWithRequiredData,
};

describe('Ewalletuser Service', () => {
  let service: EwalletuserService;
  let httpMock: HttpTestingController;
  let expectedResult: IEwalletuser | IEwalletuser[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EwalletuserService);
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

    it('should create a Ewalletuser', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const ewalletuser = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(ewalletuser).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Ewalletuser', () => {
      const ewalletuser = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(ewalletuser).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Ewalletuser', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Ewalletuser', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Ewalletuser', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addEwalletuserToCollectionIfMissing', () => {
      it('should add a Ewalletuser to an empty array', () => {
        const ewalletuser: IEwalletuser = sampleWithRequiredData;
        expectedResult = service.addEwalletuserToCollectionIfMissing([], ewalletuser);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ewalletuser);
      });

      it('should not add a Ewalletuser to an array that contains it', () => {
        const ewalletuser: IEwalletuser = sampleWithRequiredData;
        const ewalletuserCollection: IEwalletuser[] = [
          {
            ...ewalletuser,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addEwalletuserToCollectionIfMissing(ewalletuserCollection, ewalletuser);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Ewalletuser to an array that doesn't contain it", () => {
        const ewalletuser: IEwalletuser = sampleWithRequiredData;
        const ewalletuserCollection: IEwalletuser[] = [sampleWithPartialData];
        expectedResult = service.addEwalletuserToCollectionIfMissing(ewalletuserCollection, ewalletuser);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ewalletuser);
      });

      it('should add only unique Ewalletuser to an array', () => {
        const ewalletuserArray: IEwalletuser[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const ewalletuserCollection: IEwalletuser[] = [sampleWithRequiredData];
        expectedResult = service.addEwalletuserToCollectionIfMissing(ewalletuserCollection, ...ewalletuserArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const ewalletuser: IEwalletuser = sampleWithRequiredData;
        const ewalletuser2: IEwalletuser = sampleWithPartialData;
        expectedResult = service.addEwalletuserToCollectionIfMissing([], ewalletuser, ewalletuser2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(ewalletuser);
        expect(expectedResult).toContain(ewalletuser2);
      });

      it('should accept null and undefined values', () => {
        const ewalletuser: IEwalletuser = sampleWithRequiredData;
        expectedResult = service.addEwalletuserToCollectionIfMissing([], null, ewalletuser, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(ewalletuser);
      });

      it('should return initial array if no Ewalletuser is added', () => {
        const ewalletuserCollection: IEwalletuser[] = [sampleWithRequiredData];
        expectedResult = service.addEwalletuserToCollectionIfMissing(ewalletuserCollection, undefined, null);
        expect(expectedResult).toEqual(ewalletuserCollection);
      });
    });

    describe('compareEwalletuser', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareEwalletuser(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareEwalletuser(entity1, entity2);
        const compareResult2 = service.compareEwalletuser(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareEwalletuser(entity1, entity2);
        const compareResult2 = service.compareEwalletuser(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareEwalletuser(entity1, entity2);
        const compareResult2 = service.compareEwalletuser(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
