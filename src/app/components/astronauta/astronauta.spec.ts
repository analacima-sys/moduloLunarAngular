import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Astronauta } from './astronauta';

describe('Astronauta', () => {
  let component: Astronauta;
  let fixture: ComponentFixture<Astronauta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Astronauta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Astronauta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
