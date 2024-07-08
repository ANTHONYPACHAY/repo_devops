import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAlgorithmComponent } from './list-algorithm.component';

describe('ListAlgorithmComponent', () => {
  let component: ListAlgorithmComponent;
  let fixture: ComponentFixture<ListAlgorithmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAlgorithmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListAlgorithmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
