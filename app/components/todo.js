import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';

import { isEnterKey, isEscapeKey } from 'todomvc/utils/key';

export default class TodoComponent extends Component {
  @service todoData;
}
