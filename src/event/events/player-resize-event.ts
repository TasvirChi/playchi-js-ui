import {FakeEvent} from '@playchi-js/playchi-js';
import {EventType} from '../event-type';

/**
 * PlayerResizeEvent event
 *
 * @class PlayerResizeEvent
 * @extends {FakeEvent}
 */
class PlayerResizeEvent extends FakeEvent {
  /**
   * @constructor
   *
   * @param {number} playerSize - The new volume.
   */
  constructor(playerSize: string) {
    super(EventType.PLAYER_RESIZE);
    this.payload = {
      playerSize
    };
  }
}

export {PlayerResizeEvent};
