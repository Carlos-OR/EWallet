import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EwalletransactionDetailComponent } from './ewalletransaction-detail.component';

describe('Ewalletransaction Management Detail Component', () => {
  let comp: EwalletransactionDetailComponent;
  let fixture: ComponentFixture<EwalletransactionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EwalletransactionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ ewalletransaction: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(EwalletransactionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EwalletransactionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load ewalletransaction on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.ewalletransaction).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
