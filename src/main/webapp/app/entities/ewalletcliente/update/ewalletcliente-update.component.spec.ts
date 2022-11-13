import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EwalletclienteFormService } from './ewalletcliente-form.service';
import { EwalletclienteService } from '../service/ewalletcliente.service';
import { IEwalletcliente } from '../ewalletcliente.model';
import { IEwalletransaction } from 'app/entities/ewalletransaction/ewalletransaction.model';
import { EwalletransactionService } from 'app/entities/ewalletransaction/service/ewalletransaction.service';

import { EwalletclienteUpdateComponent } from './ewalletcliente-update.component';

describe('Ewalletcliente Management Update Component', () => {
  let comp: EwalletclienteUpdateComponent;
  let fixture: ComponentFixture<EwalletclienteUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let ewalletclienteFormService: EwalletclienteFormService;
  let ewalletclienteService: EwalletclienteService;
  let ewalletransactionService: EwalletransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EwalletclienteUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(EwalletclienteUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EwalletclienteUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    ewalletclienteFormService = TestBed.inject(EwalletclienteFormService);
    ewalletclienteService = TestBed.inject(EwalletclienteService);
    ewalletransactionService = TestBed.inject(EwalletransactionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Ewalletransaction query and add missing value', () => {
      const ewalletcliente: IEwalletcliente = { id: 456 };
      const idEW: IEwalletransaction = { id: 49004 };
      ewalletcliente.idEW = idEW;

      const ewalletransactionCollection: IEwalletransaction[] = [{ id: 36186 }];
      jest.spyOn(ewalletransactionService, 'query').mockReturnValue(of(new HttpResponse({ body: ewalletransactionCollection })));
      const additionalEwalletransactions = [idEW];
      const expectedCollection: IEwalletransaction[] = [...additionalEwalletransactions, ...ewalletransactionCollection];
      jest.spyOn(ewalletransactionService, 'addEwalletransactionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ ewalletcliente });
      comp.ngOnInit();

      expect(ewalletransactionService.query).toHaveBeenCalled();
      expect(ewalletransactionService.addEwalletransactionToCollectionIfMissing).toHaveBeenCalledWith(
        ewalletransactionCollection,
        ...additionalEwalletransactions.map(expect.objectContaining)
      );
      expect(comp.ewalletransactionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const ewalletcliente: IEwalletcliente = { id: 456 };
      const idEW: IEwalletransaction = { id: 48680 };
      ewalletcliente.idEW = idEW;

      activatedRoute.data = of({ ewalletcliente });
      comp.ngOnInit();

      expect(comp.ewalletransactionsSharedCollection).toContain(idEW);
      expect(comp.ewalletcliente).toEqual(ewalletcliente);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEwalletcliente>>();
      const ewalletcliente = { id: 123 };
      jest.spyOn(ewalletclienteFormService, 'getEwalletcliente').mockReturnValue(ewalletcliente);
      jest.spyOn(ewalletclienteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ewalletcliente });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ewalletcliente }));
      saveSubject.complete();

      // THEN
      expect(ewalletclienteFormService.getEwalletcliente).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(ewalletclienteService.update).toHaveBeenCalledWith(expect.objectContaining(ewalletcliente));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEwalletcliente>>();
      const ewalletcliente = { id: 123 };
      jest.spyOn(ewalletclienteFormService, 'getEwalletcliente').mockReturnValue({ id: null });
      jest.spyOn(ewalletclienteService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ewalletcliente: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ewalletcliente }));
      saveSubject.complete();

      // THEN
      expect(ewalletclienteFormService.getEwalletcliente).toHaveBeenCalled();
      expect(ewalletclienteService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEwalletcliente>>();
      const ewalletcliente = { id: 123 };
      jest.spyOn(ewalletclienteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ewalletcliente });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(ewalletclienteService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareEwalletransaction', () => {
      it('Should forward to ewalletransactionService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(ewalletransactionService, 'compareEwalletransaction');
        comp.compareEwalletransaction(entity, entity2);
        expect(ewalletransactionService.compareEwalletransaction).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
