import React, { Component } from 'react'

import HomeScreen from './screens/HomeScreen.js';
import WeatherScreen from './screens/WeatherScreen.js';
import SettingsScreen from './screens/SettingsScreen.js';
import { Ionicons } from '@expo/vector-icons';

//console.disableYellowBox = true;

import { createBottomTabNavigator, SafeAreaView } from 'react-navigation';

export class App extends Component {
    render() {
        return(
            <SafeAreaView />
        );
    }
}

export default createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: 'LED',
            tabBarIcon: () => (
                <Ionicons name="ios-sunny" size={24} color="black" />
            )
        }
    },
    Climate: {
        screen: WeatherScreen,
        navigationOptions: {
            tabBarLabel: 'Clima',
            tabBarIcon: () => (
                <Ionicons name="ios-thermometer" size={24} color="black" />
            )
        }
    },
    Settings: {
        screen: SettingsScreen,
        navigationOptions: {
            tabBarLabel: 'Settings',
            tabBarIcon: () => (
                <Ionicons name="ios-switch" size={24} color="black" />
            )
        }
    },
});
