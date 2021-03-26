import Component from '@glimmer/component';
import { inject as service } frorm '@ember/service';

export default class TodoListComponent extends Component {
  @service('todo-data') todos;
}
