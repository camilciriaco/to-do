import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { MessageComponentModule } from '../message/message.module';
import { DataService } from '../services/data.service';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let service: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      providers:[DataService],
      imports: [IonicModule.forRoot(), MessageComponentModule, RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    service = TestBed.inject(DataService); 
    spyOn(service, 'saveTodoList').and.stub();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

it('should retrieve to-do list from localStorage', () => {

  const mockTodos = [{ id: '1', title: 'title 1', desc: 'lorem ipsum 1', isCompleted: 'Pending' }];
  spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockTodos));

  const retrievedTodos = localStorage.getItem('allAddedToDoList');

  expect(retrievedTodos).toEqual(JSON.stringify(mockTodos));
  expect(localStorage.getItem).toHaveBeenCalledWith('allAddedToDoList');
});

it('should save to-do list to localStorage', () => {
  const mockExistingTodoList = [{ id: 1, title: 'title1', desc: 'lorem ipsum 1', isCompleted: 'Pending' }];
  localStorage.setItem('allAddedToDoList', JSON.stringify(mockExistingTodoList));
  
  service.saveTodoList([{ id: 2, title: 'title2', desc: 'lorem ipsum 2', isCompleted: 'Completed' }]);
  
  const storedData = JSON.parse(localStorage.getItem('allAddedToDoList') || '[]');
  expect(storedData.length).toBe(1);
});

});
