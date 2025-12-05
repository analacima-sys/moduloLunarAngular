import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelConfiguracionComponent } from './panel-configuracion.component';

describe('PanelConfiguracionComponent', () => {
  let component: PanelConfiguracionComponent;
  let fixture: ComponentFixture<PanelConfiguracion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelConfiguracionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelConfiguracionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
