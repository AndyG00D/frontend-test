import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChipListControlComponent } from './chip-list-control.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ChipListControlComponent', () => {
  let component: ChipListControlComponent;
  let fixture: ComponentFixture<ChipListControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChipListControlComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ReactiveFormsModule, NoopAnimationsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipListControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
