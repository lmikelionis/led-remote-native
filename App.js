import React, { Component } from 'react'

import HomeScreen from './screens/HomeScreen.js';
import WeatherScreen from './screens/WeatherScreen.js';
import { Ionicons } from '@expo/vector-icons';

//console.disableYellowBox = true;

import { createBottomTabNavigator, SafeAreaView } from 'react-navigation';

export class App extends Component {
    render() {
        return(
            <SafeAreaView>
                <Text>
                    This is top text.
                </Text>
                <Text>
                    This is bottom text.
                </Text>
            </SafeAreaView>
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
    Weather: {
        screen: WeatherScreen,
        navigationOptions: {
            tabBarLabel: 'Clima',
            tabBarIcon: () => (
                <Ionicons name="ios-rainy" size={24} color="black" />
            )
        }
    },
});
