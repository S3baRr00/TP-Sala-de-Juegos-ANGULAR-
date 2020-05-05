import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegosMasListadosComponent } from './juegos-mas-listados.component';

describe('JuegosMasListadosComponent', () => {
  let component: JuegosMasListadosComponent;
  let fixture: ComponentFixture<JuegosMasListadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuegosMasListadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuegosMasListadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
