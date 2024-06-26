# UI Components

:heavy_exclamation_mark: BETA NOTICE
this feature is considered BETA and might change during next couple of releases, API is considered stable and changes will most likely be to available areas.
Please check in release notes for official release notice.

> See detailed examples on how to create and use your own components [here](create-ui-component.md)

## General

UI components are used to extend the player UI presets.
Every preset layout contains logical `areas` that allow injecting components into.
For example- a `Playback` and `Live` presets have the following areas:

- `PresetArea`
- `VideoArea`
- `GuiArea`
- `InteractiveArea`
- `BottomBar`
- `TopBar`
- `TopBarRightControls`
- `TopBarLeftControls`
- `BottomBarRightControls`
- `BottomBarLeftControls`
- `PresetFloating`
- `SeekBar`
- `LoadingSpinner`

Injecting new component into preset means:

- Runtime customization of the preset by adding new components or replacing existing components with new ones.
- A developer can define ui components from the configuration provided to the player or as part of a plugin.
- Any component must be associated to one or more presets and given a valid area name it will be injected once that preset/area is available in the player dom.

> :information_source:
> This guide assumes you are using the [Tasvirchi Player].</br>
> Each section will also contain a collapsable section to show snippet for testing the UI application in standalone mode - where it is imported directly and not used as part of the Tasvirchi Player.

[tasvirchi player]: https://github.com/tasvirchi/tasvirchi-player-js/

## Define component from configuration

A UI component can be anything that transpile to valid DOM element (using plain html, jquery, preact etc). When providing the configuration ui object, use property `uiComponents` to define new components.

See [here](configuration.md#configuicomponents) detailed documentation about the available options.

### Injecting a component into preset area

Let's say that we want to add new component into the bottom-bar in preset 'playback'. Navigate to the preset sources to figure out the name of the preset and of the area you want to inject into:

1. Open [playback.js](../src/ui-presets/playback.js).
2. Search for `displayName` property assignment (usually at the bottom of the file) - this is the preset name
3. Search for the area you want to inject into and find its' `name` property - this is the area name
4. add new item into ui configuration > property `uiComponent` as shown below.

```javascript
{
  ui: {
    uiComponents: [
      {
        label: 'niceComponent',
        presets: ['Playback'],
        area: 'TopBarRightControls',
        get: customComponent // see notes below
      }
    ];
  }
}
```

**Notes**

- to learn more about creating ui component read [this guide](create-ui-component.md).

### Injecting a component into multiple presets

Let's say that you want to inject the component also to `live` preset.

1. open [live.js](../src/ui-presets/live.js).
2. Search for `displayName` property assignment (usually at the bottom of the file) - this is the preset name
3. Search for the area you want to inject into and find its' `name` property - this is the area name
4. Assuming that preset `live` also have a area with the same name - extend the configuration as shown below.

```javascript
{
  ui: {
    uiComponents: [
      {
        label: 'niceComponent',
        presets: ['Playback', 'Live'],
        area: 'TopBarRightControls',
        get: customComponent
      }
    ];
  }
}
```

**Notes**

- Since there is only one active preset at a time, switching between presets `playback` and `live` will create new instance of the component and destroy the previous one. As such you should not rely on state management inside the component. read section `Useful tips`.

### Injecting a component relative to existing component

> The section is optional, if you don't provide any of the properties above the area will append your custom component after all the other components in the area.

Let's say that you want to position a component before/after an existing component, or you want to replace it with your own component, continuing from previous examples

1. open the preset you want to inject into.
2. find the component you want to position relative to or replace.
3. extend the configuration from previous example as shown below

The example below will replace the volume component with your own component:

```javascript
{
  ui: {
    uiComponents: [
      {
        label: 'niceComponent',
        presets: ['Playback', 'Live'],
        area: 'TopBarRightControls',
        get: customComponent,
        beforeComponent: '', // use this property to inject your component BEFORE the mentioned one
        afterComponent: '',
        replaceComponent: 'Volume'
      }
    ];
  }
}
```

**Notes**

- the name of the component is the name of the class. so for `<Volume ...` the name is `Volume`.
- you should set only of the properties above, if for example you want to set your component before and not instead the volume control, use `beforeComponent` instead of `replaceComponent`.
- This is optional, if you don't provide any of the properties above the area will append your custom component after all the other components.

### Removing an existing component

Let's say that you want to remove a an existing component.
The trick here is to replace the existing component with the special "remove" string instead of a new component.

1. open the preset you want to remove the component.
2. find the relevant component.
3. adjust the configuration as shown below

The example below will remove the settings component:

```javascript
{
  ui: {
    uiComponents: [
      {
        presets: ['Playback', 'Live'],
        area: 'BottomBarRightControls',
        replaceComponent: 'Settings',
        get: 'remove'
      }
    ];
  }
}
```

**Notes**

- the name of the component is the name of the class. so for `<Settings ...` the name is `Settings`.
- you should set only of the properties above.

### Passing props to an injected component

> The section is optional, if you don't provide props the component will not be passed with a props object

Let's say that you want to pass `props` to a component, continuing from previous examples:

1. add a `props` object to the component config
2. once component is mounted it will be instantiated and `props` object will be passed as the props to the component instance

```javascript
{
  ui: {
    uiComponents: [
      {
        label: 'niceComponent',
        presets: ['Playback', 'Live'],
        area: 'TopBarRightControls',
        get: customComponent,
        props: {myProp: true}
      }
    ];
  }
}
```

## Defining a UI component from within a plugin

> The definition of each ui component is described [here](configuration.md#configuicomponents).

The `BasePlugin` exposes an optional method `getUIComponents` that is called once when the plugin is being created. Use that method to declare UI component to be injected.

The declaration is the same as describe above when using the configuration.

```
export class MyCustomPlugin extends TasvirchiPlayer.core.BasePlugin {
  getUIComponents() {
    return [
      {
          label: 'niceComponent',
          presets: ['Playback', 'Live'],
          area: 'TopBarRightControls',
          get: customComponent
        }
    ];
  }
}
```

## Injecting and removing a UI component dynamically

The `UiManager` exposes an api `addComponent` to add a UI component dynamically.
This method returns a function for removing the injected component.

The UI component declaration is the same as describe above.

```javascript
const removeFunc = uiManager.addComponent({
  label: 'niceComponent',
  presets: ['Playback', 'Live'],
  area: 'BottomBarRightControls',
  get: customComponent,
  beforeComponent: '',
  afterComponent: '',
  replaceComponent: 'Volume',
  props: {myProp: true}
});
...
...
...
removeFunc(); // remove customComponent ('Volume' will back to its place)
```

### Useful tips

1. The player will add your component only once matching a relevant preset and area. If you fail to see your components review again the configuration and make sure the preset and area names are correct.
2. Your component will probably be added and removed multiple times so you sould avoid storing persist state in your component. If using global configuration, use the page to persist state. If using a plugin, use the plugin instance to persist state.
3. See detailed examples on how to create and use your own components [here](create-ui-component.md)
