import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation';

import HomeScreen from './screens/HomeScreen.js';
import WeatherScreen from './screens/WeatherScreen.js';

//console.disableYellowBox = true;

export default class App extends Component {
    render() {
        return(
            <AppStackNavigator/>
        );
    }
}

const AppStackNavigator = createStackNavigator({
    Home: { screen: HomeScreen },
    Weather: { screen: WeatherScreen },
});
