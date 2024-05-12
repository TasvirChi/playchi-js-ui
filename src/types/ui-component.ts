import {TPUIComponentOptions} from './ui-component-options';

export interface TPUIAddComponent extends TPUIComponentOptions {
  get: (() => any) | string;
  props?: object;
}

export interface TPUIRemoveComponent {
  /** @deprecated Use area instead. */
  container?: string;
  removeComponent: string;
  presets: Array<string>;
  area: string;
}

export interface TPUIComponent extends TPUIAddComponent, TPUIRemoveComponent {}
