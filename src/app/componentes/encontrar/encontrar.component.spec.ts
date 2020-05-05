import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncontrarComponent } from './encontrar.component';

describe('EncontrarComponent', () => {
  let component: EncontrarComponent;
  let fixture: ComponentFixture<EncontrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncontrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncontrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
