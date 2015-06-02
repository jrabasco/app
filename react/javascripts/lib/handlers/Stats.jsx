
'use strict';

var React = require('react'),
    shapes = require('../components/shapes'),
    ReactMeteor = require('../third-party/react-meteor'),
    debug = require('debug')('Stats');

var Stats = React.createClass({

    mixins: [ReactMeteor.Mixin],

    startMeteorSubscriptions: function() {
        Meteor.subscribe('gameStats');
    },

    getMeteorState: function() {
        return {
            statCount: Gamestats.find().count()
        }
    },

    render() {
        return (
            <div>
                <h1>Welcome To Your Stats {this.state.statCount}</h1>
            </div>
        );
    }


});

module.exports = Stats;
