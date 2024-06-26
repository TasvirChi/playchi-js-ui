// @flow
import {loggerType} from '../../src/utils/logger';

declare type UIOptionsObject = {
  targetId: string,
  debugActions?: boolean,
  forceTouchUI?: boolean,
  showCCButton?: boolean,
  settings?: {
    showAudioMenu?: boolean,
    showCaptionsMenu?: boolean,
    showQualityMenu?: boolean,
    showSpeedMenu?: boolean,
    showAdvancedAudioDescToggle?: boolean,
    showAdvancedCaptionsMenu?: boolean
  },
  hoverTimeout?: number,
  logger?: loggerType,
  components?: ComponentsConfig,
  uiComponents?: Array<TPUIComponent>,
  translations?: {[langKey: string]: Object},
  locale?: string;
  userTheme?: UserTheme
};
