import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { EwalletransactionService } from '../service/ewalletransaction.service';

import { EwalletransactionComponent } from './ewalletransaction.component';

describe('Ewalletransaction Management Component', () => {
  let comp: EwalletransactionComponent;
  let fixture: ComponentFixture<EwalletransactionComponent>;
  let service: EwalletransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'ewalletransaction', component: EwalletransactionComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [EwalletransactionComponent],
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
      .overrideTemplate(EwalletransactionComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EwalletransactionComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(EwalletransactionService);

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
    expect(comp.ewalletransactions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to ewalletransactionService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getEwalletransactionIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getEwalletransactionIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
