import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddtodoPage } from './addtodo.page';

describe('AddtodoPage', () => {
  let component: AddtodoPage;
  let fixture: ComponentFixture<AddtodoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtodoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
