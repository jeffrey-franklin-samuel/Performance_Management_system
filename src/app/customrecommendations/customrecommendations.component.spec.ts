import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomrecommendationsComponent } from './customrecommendations.component';

describe('CustomrecommendationsComponent', () => {
  let component: CustomrecommendationsComponent;
  let fixture: ComponentFixture<CustomrecommendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomrecommendationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomrecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
