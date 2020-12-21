<h1 align="center">
  <img alt="React Texas Hold'em Hand Matrix Component" src="https://github.com/HoldemPokerTools/RangeAssistant/blob/master/packages/web/public/logo512.png" height="200px">
  <br>
  React Texas Hold'em Hand Matrix Component
  <br>
</h1>

Hold'em Poker Tools React hand matrix is a React component to make displaying
poker ranges simple!

<p align="center">
  <a href="#install">Install</a> •
  <a href="#usage">Usage</a> •
  <a href="#api">API</a> •
  <a href="#support">Support</a> •
  <a href="#license">License</a>
</p>

## Install

Install via NPM (or Yarn):

```
npm i --save @holdem-poker-tools/hand-matrix
```

## Usage

<img src="https://user-images.githubusercontent.com/42975160/95056819-2acc9b00-06ed-11eb-957f-eceba92624e9.png" alt="Hand Matrix" width="300">

```
const range = ['AA', 'KK', 'QQ', 'AKs', 'AQs'];

<HandMatrix
  colorize={false}
  comboStyle={(combo) => ({
    background: range.indexOf(combo) !== -1 ? "lightgreen" : "lightgrey"
  })}
  comboSubtext={(combo) => range.indexOf(combo) !== -1 ? "100%" : "0%"}
  onSelect={combo => console.log(`selected ${combo}`)}
  onPointerDown={combo => console.log(`pointerDown on ${combo}`)}
  onPointerUp={combo => console.log(`pointerUp on ${combo}`)}
  onPointerEnter={combo => console.log(`pointerEnter on ${combo}`)}
  onPointerMove={combo => console.log(`pointerMove on ${combo}`)}
/>
```

For an advanced usage example, see the [Hold'em Tools Range Assistant web app](http://rangeassistant.holdempoker.tools/)
and associated [GitHub repository](https://github.com/HoldemPokerTools/RangeAssistant).

## API

Prop | Type | Default | Required | Description
---- | :----: | :-------: | :--------: | -----------
**colorize** | `Boolean` | `true` | :x: | Whether to apply default colors to the hand matrix to distinguish pairs vs offsuit vs suited hands. The result of the comboStyle function will override these default colors.
**comboStyle** | `Function` |  | :x: | Function which receives the combo (e.g. AKo) and must return an object containing the styles to apply to the matrix tile for that combo e.g. {background: "#FFFFFF"}. Useful for displaying ranges.
**showText** | `Boolean` | `true` | :x: | Whether to show the text in the combo cells
**comboSubtext** | `Function` |  | :x: | Function which receives the combo (e.g. AKo) and must return the text or React components to display beneath the combo text. Default is for no text to be displayed. Useful for displaying information such as combo equity
**onSelect** | `Function` |  | :x: | Click event handler for a combo tile. Will be called with combo e.g. AKo
**onPointerDown** | `Function` |  | :x: | Pointer down event handler for a combo tile. Will be called with combo e.g. AKo
**onPointerEnter** | `Function` |  | :x: | Pointer enter event handler for a combo tile. Will be called with combo e.g. AKo
**onPointerMove** | `Function` |  | :x: | Pointer move event handler for a combo tile. Will be called with combo e.g. AKo
**onPointerUp** | `Function` |  | :x: | Pointer up event handler for a combo tile. Will be called with combo e.g. AKo

## Support

All Hold'em Poker Tools projects are open source and free to use or
extend to your heart's extent. If you'd like to say thanks,
feel free to show your support on Buy Me a Coffee:

<a href="https://www.buymeacoffee.com/holdemtools" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-red.png" alt="Buy Me A Coffee" height="41" width="174"></a>

## License

MIT
