import { Injectable } from '@angular/core';

export interface TodoList {
  id: number;
  title: any;
  desc: any;
  isCompleted: any;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public todo: TodoList[] = [
    {
      id: 0,
      title: 'Lorem Ipsum',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      isCompleted: 'Pending',
    },
    {
      id: 1,
      title: 'dolor sit',
      desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      isCompleted: 'Completed',
    },
    {
      id: 2,
      title: 'Lorem Ipsum 2',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      isCompleted: 'Pending',
    },
    {
      id: 3,
      title: 'amet',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      isCompleted: 'Completed',
    },
    {
      id: 4,
      title: 'lipsum 4',
      desc: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      isCompleted: 'Pending',
    },
  ];
  

  constructor() { }

  public getTodo(): TodoList[] {
    return this.todo;
  }

  public getToDoById(id: number): TodoList {
    return this.todo[id];
  }


  public saveTodoList(todoList: any[]): void {
    localStorage.setItem('allAddedToDoList', JSON.stringify(todoList));
  }

  public getTodos(): string[] {
    const todosString = localStorage.getItem('allAddedToDoList');
    return todosString ? JSON.parse(todosString) : [];
  }
}
