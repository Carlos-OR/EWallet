import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EwalletransactionFormService } from './ewalletransaction-form.service';
import { EwalletransactionService } from '../service/ewalletransaction.service';
import { IEwalletransaction } from '../ewalletransaction.model';

import { EwalletransactionUpdateComponent } from './ewalletransaction-update.component';

describe('Ewalletransaction Management Update Component', () => {
  let comp: EwalletransactionUpdateComponent;
  let fixture: ComponentFixture<EwalletransactionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let ewalletransactionFormService: EwalletransactionFormService;
  let ewalletransactionService: EwalletransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EwalletransactionUpdateComponent],
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
      .overrideTemplate(EwalletransactionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EwalletransactionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    ewalletransactionFormService = TestBed.inject(EwalletransactionFormService);
    ewalletransactionService = TestBed.inject(EwalletransactionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const ewalletransaction: IEwalletransaction = { id: 456 };

      activatedRoute.data = of({ ewalletransaction });
      comp.ngOnInit();

      expect(comp.ewalletransaction).toEqual(ewalletransaction);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEwalletransaction>>();
      const ewalletransaction = { id: 123 };
      jest.spyOn(ewalletransactionFormService, 'getEwalletransaction').mockReturnValue(ewalletransaction);
      jest.spyOn(ewalletransactionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ewalletransaction });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ewalletransaction }));
      saveSubject.complete();

      // THEN
      expect(ewalletransactionFormService.getEwalletransaction).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(ewalletransactionService.update).toHaveBeenCalledWith(expect.objectContaining(ewalletransaction));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEwalletransaction>>();
      const ewalletransaction = { id: 123 };
      jest.spyOn(ewalletransactionFormService, 'getEwalletransaction').mockReturnValue({ id: null });
      jest.spyOn(ewalletransactionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ewalletransaction: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ewalletransaction }));
      saveSubject.complete();

      // THEN
      expect(ewalletransactionFormService.getEwalletransaction).toHaveBeenCalled();
      expect(ewalletransactionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEwalletransaction>>();
      const ewalletransaction = { id: 123 };
      jest.spyOn(ewalletransactionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ewalletransaction });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(ewalletransactionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
