import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartamentoFormComponent } from './apartamento-form.component';

describe('ApartamentoFormComponent', () => {
  let component: ApartamentoFormComponent;
  let fixture: ComponentFixture<ApartamentoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApartamentoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartamentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
