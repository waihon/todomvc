import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

class Todo {
  @tracked title = '';
  @tracked completed = false;

  constructor(title) {
    this.title = title;
  }
}

export default class TodoDataService extends Service {
  @tracked data = [];

  constructor(...args) {
    super(...args);

    this.data = load();
  }

  get all() {
    return this.data;
  }

  get incomplete() {
    return this.data.filter(todo => {
      return todo.completed === false;
    });
  }

  get todoCountIsOne() {
    return this.incomplete.length === 1;
  }

  get completed() {
    return this.data.filter(todo => todo.completed);
  }

  @action add(title) {
    let newTodo = new Todo(title);

    this.data = [...this.data, newTodo];

    this.persist();
  }

  @action clearCompleted() {
    this.data = this.incomplete;

    this.persist();
  }

  @action toggle(todo) {
    todo.completed = !todo.completed;

    this.persist();
  }

  @action remove(todo) {
    this.data = this.data.filter(existing => {
      return existing !== todo;
    });

    this.persist();
  }

  @action persist() {
    persist(this.data);
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
    title: todo.title,
    completed: todo.completed
  }));
}

function deserializeTodoData(jsonArray) {
  return (jsonArray || []).map(json => {
    let todo = new Todo(json.title);

    todo.completed = json.completed;

    return todo;
  });
}