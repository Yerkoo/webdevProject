import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDeteil } from './course-deteil';

describe('CourseDeteil', () => {
  let component: CourseDeteil;
  let fixture: ComponentFixture<CourseDeteil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseDeteil],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseDeteil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
