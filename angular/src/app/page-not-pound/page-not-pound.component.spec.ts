import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotPoundComponent } from './page-not-pound.component';

describe('PageNotPoundComponent', () => {
  let component: PageNotPoundComponent;
  let fixture: ComponentFixture<PageNotPoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageNotPoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageNotPoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
