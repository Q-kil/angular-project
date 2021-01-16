import { Component } from '@angular/core';
interface Todo {
  title: string;
  description: string;
}

export class EditGameParameters {
  id: string = 'test'; // sn
  name: string;
  version: string;
  username: string;

  constructor(init?: Partial<EditGameParameters>) {
    console.log('this', this.id);
    // Object.assign(this, init);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-project';

  value2 = '';

  constructor() {
    // const todo1 = {
    //   title: "organize desk",
    //   description: "clear clutter",
    // };

    // const todo2 = this.updateTodo(todo1, {
    //   description: "throw out trash",
    // });

    // console.log('todo2', todo2);

    const game = new EditGameParameters({
      name: 'test'
    });
    console.log('game', game.name);
  }

  updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
    return { ...todo, ...fieldsToUpdate };
  }
}
