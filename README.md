# react-native-kenburns-view 
<p align="left">
  <a href="http://opensource.org/licenses/ISC">
    <img src="https://img.shields.io/badge/license-ISC-blue.svg" alt="react-native-kenburns-view is released under the ISC license." />
  </a>
  <a href="https://www.npmjs.com/package/react-native-kenburns-view">
    <img src="https://badge.fury.io/js/react-native-kenburns-view.svg" alt="Current npm package version." />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=nHiRanZ">
    <img src="https://img.shields.io/twitter/follow/nHiRanZ.svg?label=Follow%20@nHiRanZ" alt="Follow @nHiRanZ" />
  </a>
  <a href="https://nimila.online">
    <img src="https://img.shields.io/badge/website-nimila.online-blue" alt="Website" />
  </a>
</p>

[`KenBurns`](https://en.wikipedia.org/wiki/Ken_Burns_effect) Image Effect for React Native. Now implemented with the modern `Animated` API, supporting both smooth **zoom** and **pan**.
Version: 5.0.0

Tested on React Native 0.76.5 iOS and Android.

## Installation
```bash
$ npm i react-native-kenburns-view --save
```

## Demo/Example

![kenburns view demo](https://media.giphy.com/media/792gUTkm8Gic8AieQl/giphy.gif)

Run the example app (Expo) from `example/kenburns-example`: `cd example/kenburns-example && npm install && npx expo start`.

## Usage

```jsx
import KenBurnsImage from 'react-native-kenburns-view';

<KenBurnsImage
  imageWidth={200}
  imageHeight={100}
  sourceUri={require('./images/kenburnsimage.jpg')}
  placeholderSource={require('./images/placeholder.jpg')}
  // optional, see API below:
  zoomStart={1}
  zoomEnd={1.3}
  panX={0.1}
  panY={0.1}
/>
```

## API (props)

| Prop | Description |
|---|---|
| **`imageWidth`** | `number` Image width. |
| **`imageHeight`** | `number` Image height. |
| **`sourceUri`** | `ImageSource` Image source (e.g. `require()` or `{ uri: string }`). |
| **`placeholderSource`** | `ImageSource` Placeholder image source (optional). |
| **`autoStart`** | `boolean` Autostarts the animation. Default: `true`. |
| **`duration`** | `number` Duration (ms) for a full zoom/pan in one direction before reversing. Default: `20000`. |
| **`zoomStart`** | `number` Start zoom factor. Default: `1`. |
| **`zoomEnd`** | `number` End zoom factor. Default: `1.3`. |
| **`panX`** | `number` Horizontal pan amount as a fraction of `imageWidth`. Default: `0.1` (10% each way). |
| **`panY`** | `number` Vertical pan amount as a fraction of `imageHeight`. Default: `0.1` (10% each way). |

## npm

Link: [`react-native-kenburns-view on npm`](https://www.npmjs.com/package/react-native-kenburns-view)

## License

[`ISC`](http://opensource.org/licenses/ISC) License

## Feedback

Website: [nimila.online](https://nimila.online)  
Email: nimilahiran@gmail.com  
X/Twitter: [@nHiRanZ](https://twitter.com/nHiRanZ)

