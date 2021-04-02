import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class TodoListComponent extends Component {
  @service todoData;

  @tracked canToggle = true;

  get areAllCompleted() {
    let { todos } = this.args;

    return todos.every(todo => {
      return todo.completed;
    });
  }

  @action toggleAll() {
    let { todos } = this.args;
    let isCompleted = this.areAllCompleted;

    todos.forEach(todo => todo.completed = !isCompleted);

    this.todoData.persist();
  }

  @action disableToggle() {
    this.canToggle = false;
  }

  @action enableToggle() {
    this.canToggle = true;
  }
}
