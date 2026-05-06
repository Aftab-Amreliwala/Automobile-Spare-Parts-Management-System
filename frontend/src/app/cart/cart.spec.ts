import { ComponentFixture, TestBed } from '@angular/core/testing';

import { createComponent } from './cart.component';

describe('Cart', () => {
  let component: createComponent;
  let fixture: ComponentFixture<createComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [createComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(createComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
