/**
 * Created by Nimila Hiranya Samarasinghe
 * Links: https://github.com/nHiRanZ
 *
 * Version: 0.0.2
 *
 * Description: This reflects the KenBurns effect in a React Native Image
 */

'use strict';

var React = require('react-native');
var TimerMixin = require('react-timer-mixin');
var rebound = require('rebound');
var {
    Image,
    View
    } = React;

var KenBurnsImage = React.createClass({

    mixins: [TimerMixin],
    propTypes: {
        onPress: React.PropTypes.func,
    },

    getInitialState() {
        return {
            scale: null,
        };
    },

    componentWillMount() {
        if (!this.isMounted()) {
            this.springSystemFunctions();
        }
    },

    springSystemFunctions() {
        this.springSystem = new rebound.SpringSystem();
        this._scrollSpring = this.springSystem.createSpring();
        var springConfig = this._scrollSpring.getSpringConfig();
        springConfig.tension = this.props.tension;
        springConfig.friction = this.props.friction;

        this._scrollSpring.addListener({
            onSpringUpdate: () => {
                this.setState({scale: this._scrollSpring.getCurrentValue()});
            },
        });

        this._scrollSpring.setCurrentValue(1);
    },

    componentWillUnmount(){
        this._scrollSpring.removeAllListeners();
    },

    componentDidMount(){
        this.animLoop();
    },

    animLoop(){
        this.animationFunc();
        this.setTimeout(
            () => { this.animLoop(); },
            (Math.floor((Math.random() * 11000) + 10000))
        );
    },

    animationFunc(){
        var max = 2.500;
        var min = 2.000;
        var endValue = (Math.random() * (max - min) + min).toFixed(3);
        this._scrollSpring.setEndValue(endValue);
        this.setTimeout(
            () => { this._scrollSpring.setEndValue(1); },
            (Math.floor((Math.random() * 6000) + 4000))
        );
    },

    render: function() {
        var imageStyle = {
            alignItems: 'stretch',
            width: this.props.imageWidth,
            height: this.props.imageHeight,
            transform: [
                {
                    scale: this.state.scale
                },
            ],
        };

        return (
            <View>
                <Image
                    defaultSource={this.props.placeholderSource}
                    source={this.props.sourceUri}
                    style={imageStyle}>
                    {this.props.children}
                </Image>
            </View>
        );
    },
});

module.exports = KenBurnsImage;
