/**
 * Created by Nimila Hiranya Samarasinghe
 * Links: https://github.com/nHiRanZ
 *
 * Version: 4.0.0
 *
 * Description: This reflects the KenBurns effect in a React Native Image
 */

'use strict';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import rebound from 'rebound';
import {Image, View} from 'react-native';
import ReactTimeout from 'react-timeout';

class KenBurnsView extends Component {
    static defaultProps = {
        duration: 10000,
        tension: 6,
        friction: 50,
        min: 1.3,
        max: 1.6,
        autoStart: true,
    };

    state = {
        scale: null,
    };

    UNSAFE_componentWillMount() {
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
        const {tension, friction} = this.props;

        springConfig.tension = tension;
        springConfig.friction = friction;

        this._scrollSpring.addListener({
            onSpringUpdate: () => {
                this.setState({scale: this._scrollSpring.getCurrentValue()});
            },
        });

        this._scrollSpring.setCurrentValue(1);
    }

    componentDidMount() {
        this._mounted = true;
        const {autoStart} = this.props;
        if (autoStart) {
            this.animationFunc();
        }
    }

    animLoop = () => {
        this.animationFunc();
        this.props.setTimeout(() => {
            this.animLoop();
        }, this.props.duration * 2);
    };

    animationFunc = () => {
        const {min, max, duration} = this.props;
        const endValue = parseFloat((Math.random() * (max - min) + min).toFixed(2));
        this._scrollSpring.setEndValue(endValue);
        this.props.setTimeout(() => {
            this._scrollSpring.setEndValue(1);
        }, duration);
    };

    resetAnimation = () => {
        this._scrollSpring && this._scrollSpring.setCurrentValue(1);
    };

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
    autoStart: PropTypes.bool,
    duration: PropTypes.number,
    tension: PropTypes.number,
    friction: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
};

export default ReactTimeout(KenBurnsView);
