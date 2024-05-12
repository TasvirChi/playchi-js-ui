import {FakeEvent} from '@playchi-js/playchi-js';
import {EventType} from '../event-type';

/**
 * ForwardClickedEvent event
 *
 * @class ForwardClickedEvent
 * @extends {FakeEvent}
 */
class ForwardClickedEvent extends FakeEvent {
  /**
   * @constructor
   *
   * @param {number} from - The start seek time.
   * @param {number} to - The target seek time.
   */
  constructor(from: number, to: number) {
    super(EventType.USER_CLICKED_FORWARD);
    this.payload = {
      from: from,
      to: to
    };
  }
}

export {ForwardClickedEvent};
