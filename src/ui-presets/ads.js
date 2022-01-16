//@flow
import style from '../styles/style.scss';
import {Fragment, h} from 'preact';
import {connect} from 'react-redux';
import {Loading} from '../components/loading';
import {Volume} from '../components/volume';
import {Fullscreen} from '../components/fullscreen';
import {TimeDisplayAdsContainer} from '../components/time-display-ads-container';
import {AdSkip} from '../components/ad-skip';
import {AdLearnMore} from '../components/ad-learn-more';
import {TopBar} from '../components/top-bar';
import {BottomBar} from '../components/bottom-bar';
import {UnmuteIndication} from '../components/unmute-indication';
import {PlaybackControls} from '../components/playback-controls';
import {withKeyboardEvent} from 'components/keyboard';
import {PlayerArea} from 'components/player-area';
import {GuiArea} from 'components/gui-area';
import {AdLeftControls} from 'components/ad-left-controls';

const PRESET_NAME = 'Ads';

/**
 * Ads ui interface component
 *
 * @param {*} props component props
 * @param {*} context component context
 * @returns {?HTMLElement} player ui tree
 */
function AdsUI(props: any, context: any): ?React$Element<any> {
  props.updateIsKeyboardEnabled(true);
  if (useDefaultAdsUi(props, context)) {
    return (
      <div className={style.adGuiWrapper}>
        <PlayerArea name={'PresetArea'}>
          <div className={style.playerGui} id="player-gui">
            <GuiArea>
              <Fragment>
                <Loading />
                <UnmuteIndication hasTopBar />
              </Fragment>
              <Fragment>
                <TopBar disabled={true} leftControls={<AdLeftControls />} />
              </Fragment>
            </GuiArea>
          </div>
        </PlayerArea>
      </div>
    );
  }
  const adsUiCustomization = getAdsUiCustomization();
  const bottomBar = (
    <BottomBar
      leftControls={
        <Fragment>
          <PlaybackControls name={'BottomBarPlaybackControls'} />
          <TimeDisplayAdsContainer />
        </Fragment>
      }
      rightControls={
        <Fragment>
          <Volume />
          <Fullscreen />
        </Fragment>
      }
    />
  );
  const onlyFullscreenBottomBar = (
    <BottomBar
      rightControls={
        <Fragment>
          <Fullscreen />
        </Fragment>
      }
    />
  );

  return (
    <div className={style.adGuiWrapper}>
      <PlayerArea name={'PresetArea'}>
        <div className={style.playerGui} id="player-gui">
          <GuiArea>
            <Fragment>
              <Loading />
              <UnmuteIndication hasTopBar />
              {adsUiCustomization.skipButton ? <AdSkip /> : undefined}
              <PlaybackControls name={'OverlayPlaybackControls'} className={style.centerPlaybackControls} />
            </Fragment>
            <Fragment>
              <TopBar
                disabled={true}
                leftControls={<AdLeftControls />}
                rightControls={adsUiCustomization.learnMoreButton ? <AdLearnMore /> : undefined}
              />
              {displayBottomBar(props) ? bottomBar : onlyFullscreenBottomBar}
            </Fragment>
          </GuiArea>
        </div>
      </PlayerArea>
    </div>
  );
}

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  state: {
    shell: state.shell,
    engine: {
      adIsLinear: state.engine.adIsLinear,
      adContentType: state.engine.adContentType
    }
  }
});

const AdsUIComponent = connect(mapStateToProps)(withKeyboardEvent(PRESET_NAME)(AdsUI));
AdsUIComponent.displayName = PRESET_NAME;
/**
 * Ads ui interface
 *
 * @export
 * @param {*} props component props
 * @returns {?HTMLElement} player ui tree
 */
export function adsUI(props: any): ?React$Element<any> {
  return <AdsUIComponent {...props} />;
}

/**
 * Gets the ads ui customization settings
 * @returns {Object} - Customization object
 */
function getAdsUiCustomization(): Object {
  return {
    learnMoreButton: useCustomLearnMoreButton(),
    skipButton: useCustomSkipButton()
  };
}

/**
 * Whether the default ads ui should be shown or not.
 * @param {any} props - component props
 * @param {any} context - context
 * @returns {boolean} - Whether the default ads ui should be shown or not.
 */
function useDefaultAdsUi(props: any, context: any): boolean {
  const isMobileUI = props.state.shell.isMobile && !context.player.env.isIPadOS;
  let useStyledLinearAds = false;
  try {
    const adsRenderingSettings = context.player.config.plugins.ima.adsRenderingSettings;
    useStyledLinearAds = adsRenderingSettings && adsRenderingSettings.useStyledLinearAds;
  } catch (e) {
    // Do nothing
  }
  return isMobileUI || useStyledLinearAds;
}

/**
 * @returns {boolean} - Whether to use playkit skip button or not.
 */
function useCustomSkipButton(): boolean {
  //TODO: false until we develop are own ads manager
  return false;
}

/**
 * @returns {boolean} - Whether to use playkit learn more button or not.
 */
function useCustomLearnMoreButton(): boolean {
  //TODO: false until we develop are own ads manager
  return false;
}

/**
 * @param {any} props - component props
 * @returns {boolean} - Whether to display bottom bar or not.
 */
function displayBottomBar(props: any): boolean {
  const {adIsLinear, adContentType} = props.state.engine;
  return !(adIsLinear && adContentType && !adContentType.startsWith('video'));
}
