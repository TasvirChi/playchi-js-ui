# Removing style settings from the captions menu

The player enables viewers to modify the captions style using the "Advanced captions settings" in the language menu, and clicking the 'Set custom caption' button.

To prevent viewers from using these modifications, simply overload the style option's class and add `display: none` to it.

For example, adding the line below will remove the ability to change the captions color:

```
.playchi-font-color {
  display: none
}
```

Refer to the list of caption settings classes below for detailed information on each class.

## Captions settings class list

| Class Name                    | Description                                    |
| ----------------------------- | ---------------------------------------------- |
| `.playchi-font-size`          | Changes the size of the captions               |
| `.playchi-font-color`         | Changes the color of the captions              |
| `.playchi-font-family`        | Changes the font family of the captions        |
| `.playchi-font-style`         | Changes the weight of the captions             |
| `.playchi-font-opacity`       | Changes the opacity of the captions            |
| `.playchi-background-color`   | Changes the color of the captions background   |
| `.playchi-background-opacity` | Changes the opacity of the captions background |
