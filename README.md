# react-native-kenburns-view

[`KenBurns`](https://en.wikipedia.org/wiki/Ken_Burns_effect) Image Effect for React Native. Based on Image Component [`Image` Component](https://facebook.github.io/react-native/docs/image.html).
Version: 0.0.1

Tested on React Native iOS Apps only.

## Installation

```bash
$ npm i react-native-kenburns-view --save
```

## Usage

```jsx
<BurnsImage tension={4} friction={50} imageWidth={200} imageHeight={100} sourceUri={{uri: ./images/kenburnsimage.jpg}} placeholderSource={{uri: './images/placeholder.jpg'}}>
</BurnsImage>
```


## API (props)

| Prop | Description |
|---|---|
|**`tension`**| `int` Tension Value. |
|**`friction`**| `int` Friction Value. |
|**`imageWidth`**| `int` Image Width. |
|**`imageHeight`**| `int` Image Height. |
|**`sourceUri`**| `URI String` Image URL. |
|**`placeholderSource`**| `URI String` Placeholder Image URL (Possibly a Local Image). |

## npm

Link: [`react-native-kenburns-view on npm`](https://www.npmjs.com/package/react-native-kenburns-view)

## License

[`ISC`](http://opensource.org/licenses/ISC) License

## Feedback

Email: nimilahiran@gmail.com
Twitter: [`nHiRanZ on Twitter`](https://twitter.com/nHiRanZ)