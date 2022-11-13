import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EwalletuserFormService } from './ewalletuser-form.service';
import { EwalletuserService } from '../service/ewalletuser.service';
import { IEwalletuser } from '../ewalletuser.model';

import { EwalletuserUpdateComponent } from './ewalletuser-update.component';

describe('Ewalletuser Management Update Component', () => {
  let comp: EwalletuserUpdateComponent;
  let fixture: ComponentFixture<EwalletuserUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let ewalletuserFormService: EwalletuserFormService;
  let ewalletuserService: EwalletuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EwalletuserUpdateComponent],
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
      .overrideTemplate(EwalletuserUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EwalletuserUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    ewalletuserFormService = TestBed.inject(EwalletuserFormService);
    ewalletuserService = TestBed.inject(EwalletuserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const ewalletuser: IEwalletuser = { id: 456 };

      activatedRoute.data = of({ ewalletuser });
      comp.ngOnInit();

      expect(comp.ewalletuser).toEqual(ewalletuser);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEwalletuser>>();
      const ewalletuser = { id: 123 };
      jest.spyOn(ewalletuserFormService, 'getEwalletuser').mockReturnValue(ewalletuser);
      jest.spyOn(ewalletuserService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ewalletuser });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ewalletuser }));
      saveSubject.complete();

      // THEN
      expect(ewalletuserFormService.getEwalletuser).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(ewalletuserService.update).toHaveBeenCalledWith(expect.objectContaining(ewalletuser));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEwalletuser>>();
      const ewalletuser = { id: 123 };
      jest.spyOn(ewalletuserFormService, 'getEwalletuser').mockReturnValue({ id: null });
      jest.spyOn(ewalletuserService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ewalletuser: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ewalletuser }));
      saveSubject.complete();

      // THEN
      expect(ewalletuserFormService.getEwalletuser).toHaveBeenCalled();
      expect(ewalletuserService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEwalletuser>>();
      const ewalletuser = { id: 123 };
      jest.spyOn(ewalletuserService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ewalletuser });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(ewalletuserService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
