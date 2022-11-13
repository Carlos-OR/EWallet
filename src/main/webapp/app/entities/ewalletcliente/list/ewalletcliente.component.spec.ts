import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { EwalletclienteService } from '../service/ewalletcliente.service';

import { EwalletclienteComponent } from './ewalletcliente.component';

describe('Ewalletcliente Management Component', () => {
  let comp: EwalletclienteComponent;
  let fixture: ComponentFixture<EwalletclienteComponent>;
  let service: EwalletclienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'ewalletcliente', component: EwalletclienteComponent }]), HttpClientTestingModule],
      declarations: [EwalletclienteComponent],
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
      .overrideTemplate(EwalletclienteComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EwalletclienteComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(EwalletclienteService);

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
    expect(comp.ewalletclientes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to ewalletclienteService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getEwalletclienteIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getEwalletclienteIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
