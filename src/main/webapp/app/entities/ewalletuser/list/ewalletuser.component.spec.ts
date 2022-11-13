import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { EwalletuserService } from '../service/ewalletuser.service';

import { EwalletuserComponent } from './ewalletuser.component';

describe('Ewalletuser Management Component', () => {
  let comp: EwalletuserComponent;
  let fixture: ComponentFixture<EwalletuserComponent>;
  let service: EwalletuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'ewalletuser', component: EwalletuserComponent }]), HttpClientTestingModule],
      declarations: [EwalletuserComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(EwalletuserComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EwalletuserComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(EwalletuserService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.ewalletusers?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to ewalletuserService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getEwalletuserIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getEwalletuserIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
