import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddtodoPage } from './addtodo.page';
import { ModalController, AngularDelegate } from '@ionic/angular'; 

describe('AddtodoPage', () => {
  let component: AddtodoPage;
  let fixture: ComponentFixture<AddtodoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddtodoPage],
      providers: [ModalController, AngularDelegate] 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtodoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
