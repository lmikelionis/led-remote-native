import React, { Component } from 'react';
import { Alert } from 'react-native';
import { View, Switch, Button, ScrollView, Text } from 'react-native';
import { ButtonGroup} from 'react-native-elements';

import { Http } from '../libs/http.js';
import ColorSlider from '../components/ColorSlider.js';

export default class HomeScreen extends Component {
    constructor() {
        super();

        this.container = {};
        this.container.network = {};

        this.state = {
            ledState: false,
            ledMode: 0,
            colours : {
                white: {
                    value: 0,
                    state: false, 
                },
                yellow: {
                    value: 0,
                    state: false,
                },
                red: {
                    value: 0,
                    state: false,
                },
                green: {
                    value: 0,
                    state: false,
                },
                blue: {
                    value: 0,
                    state: false,
                },
                light_lvl: 0,
            },
        };

        this.isConErr = false;

        this.updateMode = this.updateMode.bind(this);
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
        this.container.network.performRequest('http://192.168.1.47:8080/?', data);
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

    onAlertDismiss = () => {
        this.isConErr = false;
        this.heartbeat();
    };

    updateAll = (data) => {
        console.log('will set vals: ', data);

        this.state.light_lvl = data.light_lvl;

        this.setSlider('white', parseInt(data.coldWhite.value));
        this.setSlider('yellow', parseInt(data.warmWhite.value));

        this.setSlider('red', parseInt(data.red.value));
        this.setSlider('green', parseInt(data.green.value));
        this.setSlider('blue', parseInt(data.blue.value));

        this.setPowerState(!!data.ledState);
        this.setState({ledMode: parseInt(data.ledMode)});
    };

    updateMode = (value) => {
        this.setState({ledMode: value});
        this.state.ledMode = value;
        this.container.network.getStateAndPerformRequest();
    };

    toggleSwitch = (value) => {
        if (this.state.ledState === false && value === true) {
            this.setPowerState(true);
            console.log('SWITCH ON');
        } else {
            this.setPowerState(false);
        }
        console.log('SWITCH OFF');

        this.container.network.setState(this);
        this.container.network.getStateAndPerformRequest();
    };

    setPowerState = (value) => {
        value = new Boolean(value).valueOf();

        this.state.ledState = value;
        this.setState({ ledState: value });

        this.setSlidersState(value);
    };

    setSlidersState = (value) => {
        let colours = {...this.state.colours};
        colours['white'].state = !value;
        colours['yellow'].state = !value;
        colours['red'].state = !value;
        colours['green'].state = !value;
        colours['blue'].state = !value;

        this.setState({ colours });
    };

    onDragStop = (input) => {
        this.setSlider(input.color, input.value);
        console.log('onDragStop');
        this.container.network.getStateAndPerformRequest();
    };

    setSlider = (color, value) => {
        let colours = {...this.state.colours};
        colours[color].value = value;

        this.setState({ colours });
    };

    render() {

        const buttons = [
            'AUTO', 
            'MANUAL', 
            // 'TIMED',
        ];
        const { selectedIndex } = this.state;

        return (
           <View style={{backgroundColor: 'powderblue', marginBottom: 50}}>

               <View style={{paddingTop: 30, height: 100, backgroundColor: 'powderblue', alignItems: 'center'}}>
                   <View style={{flex: 2, flexDirection: 'row'}}>
                       <View style={{flex: 1, marginLeft: 30}}>
                            <Switch
                                style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
                                tintColor="#f44336"
                                onTintColor="#388E3C"
                                thumbTintColor="#78909C"
                                onValueChange = {this.toggleSwitch}
                                value = {this.state.ledState}
                            />
                        </View>
                       <View style={{flex: 2, marginTop: -10}}>
                            <Text style={{fontSize: 45}}>{this.state.light_lvl}</Text>
                        </View>
                    </View>
               </View>

               <View style={{paddingTop: 5, height: 90, backgroundColor: 'skyblue'}}>
                    <ButtonGroup
                       onPress={this.updateMode}
                       selectedIndex={this.state.ledMode}
                       buttons={buttons}
                       containerStyle={{height: 70}} />
               </View>

               <ScrollView style={{backgroundColor: 'powderblue', paddingBottom: 10, marginTop: 30 }}>
                    <View>
                        <ColorSlider
                            value={this.state.colours['white'].value}
                            disabled={this.state.colours['white'].state}
                            colorVisible='white'
                            colorAssigned='white'
                            labelText='White: '
                            bubbleSize={60}
                            onDrag={this.onDrag}
                            onDragStop={this.onDragStop}
                        />

                        <ColorSlider
                            value={this.state.colours['yellow'].value}
                            disabled={this.state.colours['yellow'].state}
                            colorVisible='yellow'
                            colorAssigned='yellow'
                            labelText='yellow: '
                            bubbleSize={60}
                            onDrag={this.onDrag}
                            onDragStop={this.onDragStop}
                        />

                        <ColorSlider
                            value={this.state.colours['red'].value}
                            disabled={this.state.colours['red'].state}
                            colorVisible='red'
                            colorAssigned='red'
                            labelText='RED: '
                            bubbleSize={60}
                            onDrag={this.onDrag}
                            onDragStop={this.onDragStop}
                        />

                        <ColorSlider
                            value={this.state.colours['green'].value}
                            disabled={this.state.colours['green'].state}
                            colorVisible='green'
                            colorAssigned='green'
                            labelText='green: '
                            bubbleSize={60}
                            onDrag={this.onDrag}
                            onDragStop={this.onDragStop}
                        />

                        <ColorSlider
                            value={this.state.colours['blue'].value}
                            disabled={this.state.colours['blue'].state}
                            colorVisible='blue'
                            colorAssigned='blue'
                            labelText='blue: '
                            bubbleSize={60}
                            onDrag={this.onDrag}
                            onDragStop={this.onDragStop}
                        />
                    </View>
                </ScrollView>

               <Button title="Atmo" onPress={() => this.props.navigation.navigate('Weather')}></Button>

               <View style={{backgroundColor: 'powderblue', height: 210}}/>
            </View>
        );
    }
}