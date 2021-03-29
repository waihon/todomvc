import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

class Todo {
  @tracked text = '';
  @tracked isCompleted = false;

  constructor(text) {
    this.text = text;
  }
}

export default class TodoDataService extends Service {
  @tracked todos = [];

  constructor(...args) {
    super(...args);

    this.todos = load();
  }

  get all() {
    return this.todos;
  }

  get incomplete() {
    return this.todos.filter(todo => {
      return todo.isCompleted === false;
    });
  }

  get todoCountIsOne() {
    return this.incomplete.length === 1;
  }

  get completed() {
    return this.todos.filter(todo => todo.isCompleted);
  }

  @action
  add(text) {
    let newTodo = new Todo(text);

    this.todos = [...this.todos, newTodo];
  }

  @action
  clearCompleted() {
    this.todos = this.incomplete;
  }

  @action
  toggleCompletion(todo) {
    todo.isCompleted = !todo.isCompleted;
  }

  @action
  remove(todo) {
    this.todos = this.todos.filter(existing => {
      return existing !== todo;
    });
  }
}

/************************
 * local storage helpers
 ************************/
function load() {
  let jsonString = localStorage.getItem('todos');
  let jsonArray = (jsonString && JSON.parse(jsonString));

  let todos = deserializeTodoData(jsonArray);

  return todos;
}

function persist(todos) {
  let jsonArray = serializeTodos(todos);
  let jsonString = JSON.stringify(jsonArray);

  localStorage.setItem('todos', jsonString);

  return jsonString;
}

function serializeTodos(todos) {
  return todos.map(todo => ({
    text: todo.text,
    isCompleted: todo.isCompleted
  }));
}

function deserializeTodoData(jsonArray) {
  return (jsonArray || []).map(json => {
    let todo = new Todo(json.text);

    todo.isCompleted = json.isCompleted;

    return todo;
  });
}