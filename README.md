# react-native-kenburns-view [![npm version](https://badge.fury.io/js/react-native-kenburns-view.svg)](https://badge.fury.io/js/react-native-kenburns-view)

[`KenBurns`](https://en.wikipedia.org/wiki/Ken_Burns_effect) Image Effect for React Native. Based on Image Component [`Image` Component](https://facebook.github.io/react-native/docs/image.html).
Version: 2.0.0

Tested on React Native 0.40+ iOS and Android.

## Installation

```bash
$ npm i react-native-kenburns-view --save
```

## Demo/Example

![kenburns view demo](https://media.giphy.com/media/xTcnT8ju8pHKhIZY9G/giphy.gif)

Go to `react-native-kenburns-view/example/KenBurnsExample` to view the example.

## Usage

```jsx
<BurnsImage tension={4} friction={50} imageWidth={200} imageHeight={100} sourceUri={require(./images/kenburnsimage.jpg)} placeholderSource={require( './images/placeholder.jpg')}>
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
