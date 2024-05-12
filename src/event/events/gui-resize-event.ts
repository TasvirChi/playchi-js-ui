import {FakeEvent} from '@playchi-js/playchi-js';
import {EventType} from '../event-type';

/**
 * GuiResizeEvent event
 *
 * @class GuiResizeEvent
 * @extends {FakeEvent}
 */
class GuiResizeEvent extends FakeEvent {
  /**
   * @constructor
   *
   * @param {number} guiSize - The new volume.
   */
  constructor(guiSize: string) {
    super(EventType.GUI_RESIZE);
    this.payload = {
      guiSize
    };
  }
}

export {GuiResizeEvent};
