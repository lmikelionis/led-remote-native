import React, { Component } from 'react'
import { View, Switch, ScrollView, Text } from 'react-native';
import Slider from "react-native-slider";
import { ButtonGroup, Header } from 'react-native-elements';


import { Http } from './libs/http.js';

export default class HomeContainer extends Component {
   constructor() {
      super();

      this.container = {};
      this.container.network = {};

      this.state = {
         ledState: false,
         ledMode: 0,

         coldWhiteValue: 1,
         warmWhiteValue: 2,
         redValue: 3,
         greenValue: 4,
         blueValue: 5,
         colours : {
           white: 0,
           yellow: 0,
           red: 0,
           green: 0,
           blue: 0,
         },
      }

      this.updateMode = this.updateMode.bind(this);
   }

   componentDidMount = () => {
    const network = new Http();
    network.setCallback('updateAll', this);

    this.container.network = network;

    network.setState(this);

    let data = {
      "1": "3",
    };
    network.performRequest(data);

    // this.interval = setInterval(this.updateController, 25000);
  }

  updateAll = (data) => {

    this.setSlider('white', parseInt(data.coldWhite));
    this.setSlider('yellow', parseInt(data.warmWhite));

    this.setSlider('red', parseInt(data.red));
    this.setSlider('green', parseInt(data.green));
    this.setSlider('blue', parseInt(data.blue));

    this.setPowerState(data.state);
    this.updateMode(parseInt(data.mode));

    // console.log('ALL DATA UPDATED WITH VALUES');
    // console.log(this.state);
  }

   toggleSwitch = (value) => {
      this.setPowerState(value);
      this.container.network.setState(this);
      this.container.network.getStateAndPerformRequest();
   }

   setPowerState = (value) => {
     if (value == 1) {
       value = true;
     }

     if (value == 0) {
       value = false;
     }

     this.state.ledState = value;
     this.setState({ ledState: value });
   }

   updateMode = (value) => {
      this.setState({ledMode: value})
    }

    updateSlider = (stuff) => {
      this.setSlider(stuff.color, stuff.value);
      this.container.network.getStateAndPerformRequest();
    }

    setSlider = (color, value) => {
      var colours = {...this.state.colours}
      colours[color] = value;

      this.state.colours[color] = value;
      this.setState({ colours });
    }

   render() {

    const buttons = ['AUTO', 'MANUAL', 'TIMED']
    const { selectedIndex } = this.state

    return (
       <View>
         <Header
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'RGB CCT controller', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
          />
         <View style={{paddingTop: 30, height: 100, backgroundColor: 'powderblue', alignItems: 'center'}}>

         <View style={{flex: 1, flexDirection: 'row'}}>
         <View>

             <Switch
                style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
                tintColor="#f44336"
                onTintColor="#388E3C"
                thumbTintColor="#78909C"
                onValueChange = {this.toggleSwitch}
                value = {this.state.ledState}
                />
            </View>
            <View style={{marginLeft: 225, marginTop: -20}}>
                <Text style={{fontSize: 45}}>0</Text>
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

        <ScrollView style={{backgroundColor: 'powderblue', paddingBottom: 10 }}>

        <View>

          <View style={{alignItems: 'stretch', height: 50, marginBottom: 15, paddingLeft: 10, paddingRight: 10, justifyContent: 'center'}}>

             <Slider
              style={{marginTop: 15 }}
              thumbStyle={{ width: 30, height: 30, borderRadius: 30 / 2 }}
              value={this.state.colours.white}
              thumbTintColor='white'
              minimumTrackTintColor='white'
              step={1}
              minimumValue={0}
              maximumValue={255}
              onSlidingComplete={(value) => this.updateSlider({color: 'white', value})}/>
             <Text>Cold white: {this.state.colours.white}</Text>
           </View>

         <View style={{alignItems: 'stretch', height: 50, marginBottom: 15, paddingLeft: 10, paddingRight: 10, justifyContent: 'center'}}>
          <Slider
          style={{marginTop: 15 }}
          thumbStyle={{ width: 30, height: 30, borderRadius: 30 / 2 }}
            value={this.state.colours.yellow}
            thumbTintColor='yellow'
            minimumTrackTintColor='yellow'
            step={1}
            minimumValue={0}
            maximumValue={255}
            onSlidingComplete={(value) => this.updateSlider({color: 'yellow', value})} />
          <Text>Warm white: {this.state.colours.yellow}</Text>
        </View>

        <View style={{alignItems: 'stretch', height: 50, marginBottom: 15, paddingLeft: 10, paddingRight: 10, justifyContent: 'center'}}>
          <Slider
          style={{marginTop: 15 }}
          thumbStyle={{ width: 30, height: 30, borderRadius: 30 / 2 }}
            value={this.state.colours.red}
            thumbTintColor='#B00F1D'
            minimumTrackTintColor='#B00F1D'
            step={1}
            minimumValue={0}
            maximumValue={255}
            onSlidingComplete={(value) => this.updateSlider({color: 'red', value})} />
          <Text>Red: {this.state.colours.red}</Text>
        </View>

        <View style={{alignItems: 'stretch', height: 50, marginBottom: 15, paddingLeft: 10, paddingRight: 10, justifyContent: 'center'}}>
          <Slider
          style={{marginTop: 15 }}
          thumbStyle={{ width: 30, height: 30, borderRadius: 30 / 2 }}
            value={this.state.colours.green}
            thumbTintColor='green'
            minimumTrackTintColor='green'
            step={1}
            minimumValue={0}
            maximumValue={255}
            onSlidingComplete={(value) => this.updateSlider({color: 'green', value})} />
          <Text>Green: {this.state.colours.green}</Text>
        </View>

        <View style={{alignItems: 'stretch', height: 50, marginBottom: 15, paddingLeft: 10, paddingRight: 10, justifyContent: 'center'}}>
          <Slider
          style={{marginTop: 15 }}
          thumbStyle={{ width: 30, height: 30, borderRadius: 30 / 2 }}
            value={this.state.colours.blue}
            thumbTintColor='blue'
            minimumTrackTintColor='blue'
            step={1}
            minimumValue={0}
            maximumValue={255}
            onSlidingComplete={(value) => this.updateSlider({color: 'blue', value})}/>
          <Text>Blue: {this.state.colours.blue}</Text>
        </View>

        </View>

      </ScrollView>

    </View>
    );
   }
}
