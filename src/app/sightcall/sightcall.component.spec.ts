import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SightcallComponent } from './sightcall.component';

describe('SightcallComponent', () => {
  let component: SightcallComponent;
  let fixture: ComponentFixture<SightcallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SightcallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SightcallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
