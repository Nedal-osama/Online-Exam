import { TestBed } from '@angular/core/testing';

import { AuthAdabtor } from './auth-adabtor';

describe('AuthAdabtor', () => {
  let service: AuthAdabtor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthAdabtor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
