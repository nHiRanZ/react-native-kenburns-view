/**
 * Created by Nimila Hiranya Samarasinghe
 * Links: https://github.com/nHiRanZ
 *
 * Version: 4.1.0
 *
 * Description: Ken Burns effect (zoom + pan) for React Native images.
 */

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Easing,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';

const DEFAULT_DURATION = 20000;
const FILL_SCALE = 1.15;

function getRandomCycle(zoomStart, zoomEnd, panXAmount, panYAmount) {
  return {
    scaleFrom: zoomStart + Math.random() * (zoomEnd - zoomStart),
    scaleTo: zoomStart + Math.random() * (zoomEnd - zoomStart),
    txFrom: -panXAmount + Math.random() * 2 * panXAmount,
    txTo: -panXAmount + Math.random() * 2 * panXAmount,
    tyFrom: -panYAmount + Math.random() * 2 * panYAmount,
    tyTo: -panYAmount + Math.random() * 2 * panYAmount,
  };
}

const KenBurnsView = forwardRef((props, ref) => {
  const {
    imageWidth,
    imageHeight,
    sourceUri,
    placeholderSource,
    autoStart = true,
    duration = DEFAULT_DURATION,
    zoomStart = 1,
    zoomEnd = 1.3,
    panX = 0.1,
    panY = 0.1,
    children,
    style,
    ...rest
  } = props;

  const w = imageWidth || 0;
  const h = imageHeight || 0;
  const panXAmount = w * panX;
  const panYAmount = h * panY;

  const progress = useRef(new Animated.Value(0)).current;
  const animationRef = useRef(null);
  const configRef = useRef({ zoomStart, zoomEnd, panXAmount, panYAmount });
  configRef.current = { zoomStart, zoomEnd, panXAmount, panYAmount };

  const [cycle, setCycle] = useState(() =>
    getRandomCycle(zoomStart, zoomEnd, panXAmount, panYAmount),
  );
  const cycleRef = useRef(cycle);
  cycleRef.current = cycle;

  const randomRef = useRef({
    durationFactor: 0.7 + Math.random() * 0.6,
  }).current;

  const stop = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current = null;
    }
  }, []);

  const runNextCycle = useCallback(() => {
    const { zoomStart: zs, zoomEnd: ze, panXAmount: pxa, panYAmount: pya } =
      configRef.current;
    const prev = cycleRef.current;
    const nextTo = getRandomCycle(zs, ze, pxa, pya);
    setCycle({
      scaleFrom: prev.scaleTo,
      scaleTo: nextTo.scaleTo,
      txFrom: prev.txTo,
      txTo: nextTo.txTo,
      tyFrom: prev.tyTo,
      tyTo: nextTo.tyTo,
    });
    progress.setValue(0);
    const d = Math.round(duration * randomRef.durationFactor);
    animationRef.current = Animated.timing(progress, {
      toValue: 1,
      duration: d,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: true,
    });
    animationRef.current.start(({ finished }) => {
      if (finished) runNextCycle();
    });
  }, [duration, progress, randomRef.durationFactor]);

  const start = useCallback(() => {
    stop();
    progress.setValue(0);
    runNextCycle();
  }, [progress, runNextCycle, stop]);

  useImperativeHandle(
    ref,
    () => ({
      start,
      stop,
      reset: () => {
        stop();
        progress.setValue(0);
      },
    }),
    [start, stop, progress],
  );

  useEffect(() => {
    if (autoStart) {
      start();
    }

    return () => {
      stop();
    };
  }, [autoStart, start, stop]);

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [cycle.txFrom, cycle.txTo],
  });

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [cycle.tyFrom, cycle.tyTo],
  });

  const scale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [cycle.scaleFrom, cycle.scaleTo],
  });

  const innerSize = {
    width: w * FILL_SCALE,
    height: h * FILL_SCALE,
  };
  const innerOffset = {
    left: -w * (FILL_SCALE - 1) / 2,
    top: -h * (FILL_SCALE - 1) / 2,
  };

  const outerStyle = [
    styles.outer,
    {
      width: imageWidth,
      height: imageHeight,
    },
    style,
  ];

  const animatedStyle = {
    ...innerSize,
    ...innerOffset,
    transform: [{scale}, {translateX}, {translateY}],
  };

  return (
    <View style={outerStyle}>
      <Animated.View style={[styles.inner, animatedStyle]}>
        <ImageBackground
          defaultSource={placeholderSource}
          source={sourceUri}
          style={styles.image}
          imageStyle={styles.imageCover}
          resizeMode="cover"
          {...rest}>
          {children}
        </ImageBackground>
      </Animated.View>
    </View>
  );
});

KenBurnsView.displayName = 'KenBurnsView';

KenBurnsView.propTypes = {
  autoStart: PropTypes.bool,
  imageWidth: PropTypes.number.isRequired,
  imageHeight: PropTypes.number.isRequired,
  sourceUri: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
    .isRequired,
  placeholderSource: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
  duration: PropTypes.number,
  zoomStart: PropTypes.number,
  zoomEnd: PropTypes.number,
  panX: PropTypes.number,
  panY: PropTypes.number,
  children: PropTypes.node,
  style: PropTypes.any,
};

KenBurnsView.defaultProps = {
  autoStart: true,
  duration: DEFAULT_DURATION,
  zoomStart: 1,
  zoomEnd: 1.3,
  panX: 0.1,
  panY: 0.1,
};

const styles = StyleSheet.create({
  outer: {
    overflow: 'hidden',
    position: 'relative',
  },
  inner: {
    position: 'absolute',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  imageCover: {
    width: '100%',
    height: '100%',
  },
});

export default KenBurnsView;
