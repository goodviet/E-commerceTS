import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersionalInfoComponent } from './persional-info.component';

describe('PersionalInfoComponent', () => {
  let component: PersionalInfoComponent;
  let fixture: ComponentFixture<PersionalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersionalInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersionalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
