import React, { Component } from 'react';
import Slider from "react-native-slider";
import { View, Text } from 'react-native';

class ColorSlider extends Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.state.colours = {};
        this.state.colours[this.props.colorAssigned] = {};
        this.state.colours[this.props.colorAssigned].value = this.props.value;
        this.state.colours[this.props.colorAssigned].label = this.props.value;
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            this.state.colours[this.props.colorAssigned].label = nextProps.value;
            let colours = {...this.state.colours};
            this.setState({ colours });
        }
    };

    onSlidingComplete = (value) => {
        this.props.onDragStop({color: this.props.colorAssigned, value});

        this.state.colours[this.props.colorAssigned].label = value;
        let colours = {...this.state.colours};
        this.setState({ colours });

        // console.log(this.state);
    };

    onValueChange = (input) => {
        this.state.colours[input.color].label = input.value;
        let colours = {...this.state.colours};
        this.setState({ colours });
    };

    render() {
        return(
            <View style={{
                alignItems: 'stretch', height: 50,
                marginBottom: 30, marginTop: 10,
                paddingLeft: 15, paddingRight: 10,
                justifyContent: 'center'
            }}>
                <Slider
                    style={{marginTop: 15, height: this.props.bubbleSize}}
                    thumbStyle={{
                        width: this.props.bubbleSize,
                        height: this.props.bubbleSize,
                        borderRadius: this.props.bubbleSize / 2
                    }}
                    value={this.props.value}
                    thumbTintColor={this.props.colorVisible}
                    minimumTrackTintColor={this.props.colorVisible}
                    step={1}
                    minimumValue={0}
                    maximumValue={255}
                    onSlidingComplete={(value) => this.onSlidingComplete(value)}
                    onValueChange={(value) => this.onValueChange({color: this.props.colorAssigned, value}) }
                />
                <Text>{this.props.labelText} {this.state.colours[this.props.colorAssigned].label}</Text>
            </View>
        );
    };
}

ColorSlider.defaultProps = {
    colorVisible: 'red',
    colorAssigned: 'red',
    value: 0,
    bubbleSize: 40,
    labelText: 'Stuff',
};

export default ColorSlider;