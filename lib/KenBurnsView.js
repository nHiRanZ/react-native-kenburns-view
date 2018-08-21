/**
 * Created by Nimila Hiranya Samarasinghe
 * Links: https://github.com/nHiRanZ
 *
 * Version: 2.0.1
 *
 * Description: This reflects the KenBurns effect in a React Native Image
 */

'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rebound from 'rebound';
import { Image, View } from 'react-native';
import TimerMixin from 'react-timer-mixin';

class KenBurnsView extends Component {
    state = {
        scale: null,
    };

    componentWillMount() {
        if (!this._mounted) {
            this.springSystemFunctions();
        }
    }

    componentWillUnmount() {
        this._mounted = false;
        this._scrollSpring && this._scrollSpring.destroy();
    }

    springSystemFunctions() {
        this.springSystem = new rebound.SpringSystem();
        this._scrollSpring = this.springSystem.createSpring();
        var springConfig = this._scrollSpring.getSpringConfig();
        springConfig.tension = this.props.tension;
        springConfig.friction = this.props.friction;

        this._scrollSpring.addListener({
            onSpringUpdate: () => {
                this.setState({ scale: this._scrollSpring.getCurrentValue() });
            },
        });

        this._scrollSpring.setCurrentValue(1);
    }

    componentDidMount() {
        this._mounted = true;
        this.animLoop();
    }

    animLoop() {
        this.animationFunc();
        TimerMixin.setTimeout(() => {
            this.animLoop();
        }, Math.floor(Math.random() * 11000 + 10000));
    }

    animationFunc() {
        var max = 2.5;
        var min = 2.0;
        var endValue = (Math.random() * (max - min) + min).toFixed(3);
        this._scrollSpring.setEndValue(endValue);
        TimerMixin.setTimeout(() => {
            this._scrollSpring.setEndValue(1);
        }, Math.floor(Math.random() * 6000 + 4000));
    }

    render() {
        var imageStyle = {
            alignItems: 'stretch',
            width: this.props.imageWidth,
            height: this.props.imageHeight,
            transform: [
                {
                    scale: this.state.scale,
                },
            ],
        };

        return (
            <View>
            <Image
        defaultSource={this.props.placeholderSource}
        source={this.props.sourceUri}
        style={imageStyle}
            >
            {this.props.children}
    </Image>
        </View>
    );
    }
}

KenBurnsView.propTypes = {
    onPress: PropTypes.func,
};

module.exports = KenBurnsView;