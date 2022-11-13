jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { EwalletclienteService } from '../service/ewalletcliente.service';

import { EwalletclienteDeleteDialogComponent } from './ewalletcliente-delete-dialog.component';

describe('Ewalletcliente Management Delete Component', () => {
  let comp: EwalletclienteDeleteDialogComponent;
  let fixture: ComponentFixture<EwalletclienteDeleteDialogComponent>;
  let service: EwalletclienteService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [EwalletclienteDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(EwalletclienteDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EwalletclienteDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(EwalletclienteService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      })
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
