import React, { Component } from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, createDrawerNavigator} from 'react-native';

import { Http } from '../libs/http.js';
import DateTimePicker from "react-native-modal-datetime-picker";
import { Ionicons } from '@expo/vector-icons';

export default class HomeScreen extends Component {

    heartbeat = () => {
        // let data = {
        //     "heartbeat": true,
        // };
        // this.container.network.performRequest('http://192.168.1.47:8080/?', data);
        // console.log('heartbeat');
    };

    handleError = (data) => {
        // if (this.isConErr === false) {
        //     Alert.alert(
        //         'Problem Problem',
        //         'Nepasijung !!!',
        //         [{ text: 'Perbandom', onPress: () => this.onAlertDismiss}]
        //     );
        //     this.isConErr = true;
        // }
    };

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this._hideDateTimePicker();
    };

    constructor() {
        super();

        this.container = {};
        this.container.network = {};

        this.state = {};

        this.isConErr = false;
    };

    componentDidMount = () => {
        // const network = new Http();
        // network.setCallback('updateAll', this);
        // network.setCallbackError('handleError', this);
        //
        // this.container.network = network;
        // this.container.network.setState(this);
        //
        // this.heartbeat();
        // this._interval = setInterval(this.heartbeat, 5000);
    };

    componentWillUnmount = () => {
        // clearInterval(this._interval);
    };

    render() {

        return (
           <SafeAreaView style={{backgroundColor: 'powderblue', marginBottom: 50, height: 900}}>

               <View>
                   <View style={{flexDirection:'column', flexWrap:'wrap', marginTop: 15}}>

                       <View>
                           <Text style={{fontSize: 25}}>Light time zones:</Text>
                       </View>


                       <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                           <View>
                                <Text style={{fontSize: 20}}>Morning:</Text>
                           </View>
                           <View>
                                <Text style={{fontSize: 20}}>06:00-10:00</Text>
                           </View>
                           <View style={{marginLeft: 20}}>
                               <TouchableOpacity onPress={this._showDateTimePicker}>
                                    <Ionicons name="ios-cog" size={24} color="black" />
                               </TouchableOpacity>
                           </View>
                       </View>

                       <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                           <View>
                                <Text style={{fontSize: 20}}>Noon:</Text>
                           </View>
                           <View>
                               <Text style={{fontSize: 20}}>06:00-10:00</Text>
                           </View>
                           <View style={{marginLeft: 20}}>
                               <TouchableOpacity onPress={this._showDateTimePicker}>
                                   <Ionicons name="ios-cog" size={24} color="black" />
                               </TouchableOpacity>
                           </View>
                       </View>

                       <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                           <View>
                                <Text style={{fontSize: 20}}>Afternoon:</Text>
                           </View>
                           <View>
                               <Text style={{fontSize: 20}}>06:00-10:00</Text>
                           </View>
                           <View style={{marginLeft: 20}}>
                               <TouchableOpacity onPress={this._showDateTimePicker}>
                                   <Ionicons name="ios-cog" size={24} color="black" />
                               </TouchableOpacity>
                           </View>
                       </View>

                       <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                           <View>
                                <Text style={{fontSize: 20}}>Evening:</Text>
                           </View>
                           <View>
                               <Text style={{fontSize: 20}}>06:00-10:00</Text>
                           </View>
                           <View style={{marginLeft: 20}}>
                               <TouchableOpacity onPress={this._showDateTimePicker}>
                                   <Ionicons name="ios-cog" size={24} color="black" />
                               </TouchableOpacity>
                           </View>

                       </View>
                   </View>


               </View>

               <DateTimePicker
                   isVisible={this.state.isDateTimePickerVisible}
                   onConfirm={this._handleDatePicked}
                   onCancel={this._hideDateTimePicker}
                   mode={'time'}
                   is24Hour={this.state.is24Hour}
               />

            </SafeAreaView>
        );
    }
}