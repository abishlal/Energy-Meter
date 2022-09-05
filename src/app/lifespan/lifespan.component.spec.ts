import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifespanComponent } from './lifespan.component';

describe('LifespanComponent', () => {
  let component: LifespanComponent;
  let fixture: ComponentFixture<LifespanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifespanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LifespanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
