import {FakeEvent} from '@playchi-js/playchi-js';
import {EventType} from '../event-type';

/**
 * UIVisibilityChangedEvent event
 *
 * @class UIVisibilityChangedEvent
 * @extends {FakeEvent}
 */
class UIVisibilityChangedEvent extends FakeEvent {
  /**
   * @constructor
   *
   * @param {boolean} visible - The visible state.
   */
  constructor(visible: boolean) {
    super(EventType.UI_VISIBILITY_CHANGED);
    this.payload = {
      visible: visible
    };
  }
}

export {UIVisibilityChangedEvent};
