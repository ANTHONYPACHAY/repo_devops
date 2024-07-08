import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAlgorithmComponent } from './create-algorithm.component';

describe('CreateAlgorithmComponent', () => {
  let component: CreateAlgorithmComponent;
  let fixture: ComponentFixture<CreateAlgorithmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAlgorithmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAlgorithmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
