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

  const progress = useRef(new Animated.Value(0)).current;
  const animationRef = useRef(null);

  const randomRef = useRef({
    phase: Math.random(),
    durationFactor: 0.7 + Math.random() * 0.6,
    panXSign: Math.random() > 0.5 ? 1 : -1,
    panYSign: Math.random() > 0.5 ? 1 : -1,
  }).current;

  const stop = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    stop();
    progress.setValue(randomRef.phase);

    const d = Math.round(duration * randomRef.durationFactor);

    animationRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: d,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: d,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
      {resetBeforeIteration: false},
    );

    animationRef.current.start();
  }, [duration, progress, stop, randomRef]);

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

  const w = imageWidth || 0;
  const h = imageHeight || 0;
  const panXAmount = w * panX * randomRef.panXSign;
  const panYAmount = h * panY * randomRef.panYSign;

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-panXAmount, panXAmount],
  });

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-panYAmount, panYAmount],
  });

  const scale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [zoomStart, zoomEnd],
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
