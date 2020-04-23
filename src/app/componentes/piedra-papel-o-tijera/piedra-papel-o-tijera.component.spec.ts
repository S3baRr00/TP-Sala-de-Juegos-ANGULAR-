import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiedraPapelOTijeraComponent } from './piedra-papel-o-tijera.component';

describe('PiedraPapelOTijeraComponent', () => {
  let component: PiedraPapelOTijeraComponent;
  let fixture: ComponentFixture<PiedraPapelOTijeraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiedraPapelOTijeraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiedraPapelOTijeraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
