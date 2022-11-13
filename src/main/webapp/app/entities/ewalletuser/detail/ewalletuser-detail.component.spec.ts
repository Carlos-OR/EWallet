import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EwalletuserDetailComponent } from './ewalletuser-detail.component';

describe('Ewalletuser Management Detail Component', () => {
  let comp: EwalletuserDetailComponent;
  let fixture: ComponentFixture<EwalletuserDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EwalletuserDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ ewalletuser: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(EwalletuserDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EwalletuserDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load ewalletuser on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.ewalletuser).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
