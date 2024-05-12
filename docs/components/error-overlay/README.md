# ErrorOverlay

Component that renders to indicate user when Tasvirchi player got an error

## Props

| Prop      | Description                                                          |
| --------- | -------------------------------------------------------------------- |
| errorHead | Valid Preact node                                                    |
| permanent | Render ErrorOverlay component despite if player got and error or not |

## Player configuration

> This guide assumes you are using the [Tasvirchi Player]

[tasvirchi player]: https://github.com/tasvirchi/tasvirchi-player-js/

In order to override error-overlay background add `backgroundUrl` link to player config

```js
const config = {
    ...
    ui: {
        components: {
            errorOverlay: {
                backgroundUrl: "https://custom-error-overlay-image-url"
            }
        }
    }
    ...
}

const player = TasvirchiPlayer.setup(config);
```

## Usage Example

```html
//@flow import { h, ErrorOverlay } from 'playchi-js-ui';

export default function customUIPreset(props: any) {
    return (
        <ErrorOverlay />
    );
}
```
