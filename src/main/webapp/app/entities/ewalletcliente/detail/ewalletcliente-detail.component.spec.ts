import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EwalletclienteDetailComponent } from './ewalletcliente-detail.component';

describe('Ewalletcliente Management Detail Component', () => {
  let comp: EwalletclienteDetailComponent;
  let fixture: ComponentFixture<EwalletclienteDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EwalletclienteDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ ewalletcliente: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(EwalletclienteDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EwalletclienteDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load ewalletcliente on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.ewalletcliente).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
