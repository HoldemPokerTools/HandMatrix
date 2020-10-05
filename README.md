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
  onMouseDown={combo => console.log(`mouseDown on ${combo}`)}
  onMouseUp={combo => console.log(`mouseDown on ${combo}`)}
  onMouseEnter={combo => console.log(`onMouseEnter on ${combo}`)}
  onClick={combo => console.log(`onClick on ${combo}`)}
  comboStyle={(combo) => ({
    background: range.indexOf(combo !== -1) ? "green" : "grey"
  })}
  comboSubtext={(combo) => range.indexOf(combo !== -1) ? "100%" : ""}
  renderItem={(combo, styles, comboSubtext, showText, colorize) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        ...styles,
      }}
    >
      {showText && (
        <>
          <div style={{ flexGrow: 1 }} type="keyboard">
            {combo}
          </div>
          <div>{comboSubtext}</div>
        </>
      )}
    </div>
  )}
/>
```

For an advanced usage example, see the [Hold'em Tools Range Assistant web app](http://rangeassistant.holdempoker.tools/)
and associated [GitHub repository](https://github.com/HoldemPokerTools/RangeAssistant).

## API

Prop | Type | Default | Required | Description
---- | :----: | :-------: | :--------: | -----------
**colorize** | `Boolean` | `true` | :x: | Whether to apply default colors to the hand matrix to distinguish pairs vs offsuit vs suited hands. The result of the comboStyle function will override the default colors.
**comboStyle** | `Function` |  | :x: | Function which receives the combo (e.g. AKo) and must return an object containing the styles to apply to the matrix tile for that combo e.g. {background: "#FFFFFF"}. Useful for displaying ranges.
**comboSubtext** | `Function` |  | :x: | Function which receives the combo (e.g. AKo) and must return the text or React components to display beneath the combo text. Default is for no text to be displayed. Useful for displaying information such as combo equity
**onClick** | `Function` |  | :x: | Click event handler for a combo tile. Will be called with combo e.g. AKo
**onMouseDown** | `Function` |  | :x: | Mouse down event handler for a combo tile. Will be called with combo e.g. AKo
**onMouseEnter** | `Function` |  | :x: | Mouseenter event handler for a combo tile. Will be called with combo e.g. AKo
**onMouseUp** | `Function` |  | :x: | Mouse up event handler for a combo tile. Will be called with combo e.g. AKo
**renderItem** | `Function` |  | :x: | A render function to use to render the contents of each tile. The function will be called with the following args: combo, styles, comboSubtext, showText, colorize where styles and comboSubtext are the result of the comboStyle and comboSubtext prop functions.
**showText** | `Boolean` | `true` | :x: | Whether to show the text in the combo tyles

## Support

All Hold'em Poker Tools projects are open source and free to use or
extend to your heart's extent. If you'd like to say thanks,
feel free to show your support on Buy Me a Coffee:

<a href="https://www.buymeacoffee.com/holdemtools" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-red.png" alt="Buy Me A Coffee" height="41" width="174"></a>

## License

MIT
