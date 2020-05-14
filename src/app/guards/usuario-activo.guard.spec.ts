import { TestBed } from '@angular/core/testing';

import { UsuarioActivoGuard } from './usuario-activo.guard';

describe('UsuarioActivoGuard', () => {
  let guard: UsuarioActivoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsuarioActivoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
