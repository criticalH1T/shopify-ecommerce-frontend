import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurStoryPageComponent } from './our-story-page.component';

describe('OurStoryPageComponent', () => {
  let component: OurStoryPageComponent;
  let fixture: ComponentFixture<OurStoryPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OurStoryPageComponent]
    });
    fixture = TestBed.createComponent(OurStoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
