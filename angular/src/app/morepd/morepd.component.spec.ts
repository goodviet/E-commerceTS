import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MorepdComponent } from './morepd.component';

describe('MorepdComponent', () => {
  let component: MorepdComponent;
  let fixture: ComponentFixture<MorepdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MorepdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MorepdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
