import React, { Component } from 'react';
import {Text, Alert, View} from 'react-native';
import { SafeAreaView } from 'react-navigation';

import {Http} from "../libs/http";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class WeatherScreen extends Component {

    constructor() {
        super();

        this.container = {};
        this.container.network = {};


        this.state = {};
        this.state.humidity = 0;
        this.state.temperature = 0;

        this.setState({humidity: 0});
        this.setState({temperature: 0});
    }

    componentDidMount = () => {
        const network = new Http();
        network.setCallback('updateAll', this);
        network.setCallbackError('handleError', this);

        this.container.network = network;
        this.container.network.setState(this);

        this.heartbeat();
        this._interval = setInterval(this.heartbeat, 5000);
    };

    componentWillUnmount = () => {
        clearInterval(this._interval);
    };

    heartbeat = () => {
        let data = {
            "heartbeat": true,
        };
        this.container.network.performRequest('http://192.168.1.47:3001/atmo_data?', data);
        console.log('heartbeat');
    };

    handleError = (data) => {
        if (this.isConErr === false) {
            Alert.alert(
                'Problem Problem',
                'Nepasijung !!!',
                [{ text: 'Perbandom', onPress: () => this.onAlertDismiss}]
            );
            this.isConErr = true;
        }
    };

    updateAll = (data) => {
        console.log('would set humidity: ', data.humidity);
        console.log('would set temperature: ', data.temperature);


        this.setState({humidity: data.humidity});
        this.setState({temperature: data.temperature});
    };

    render() {
        return(
            <SafeAreaView style={{backgroundColor: 'powderblue', marginTop: 50, flex: 1}} >
                <View>
                    <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                        <View>
                            <Text style={{fontSize: 25}}>Temperature: </Text>
                        </View>
                        <View>
                            <Text style={{fontSize: 25}}>{this.state.temperature}</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                        <View>
                            <Text style={{fontSize: 25}}>Humidity: </Text>
                        </View>
                        <View>
                            <Text style={{fontSize: 25}}>{this.state.humidity}</Text>
                        </View>
                    </View>
                </View>
                <View style={{backgroundColor: 'powderblue', height: 800}}/>
            </SafeAreaView>
        );
    }
}