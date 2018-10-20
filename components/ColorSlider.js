import React, { Component } from 'react';
import Slider from "react-native-slider";
import { View, Text } from 'react-native';

class ColorSlider extends Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.state.colorVisible = this.props.colorVisible;
        this.state.colorVisibleArchive = this.props.colorVisible;
        this.state.colorAssigned = this.props.colorAssigned;
        this.state.disabled = this.props.disabled;
        this.state.value = this.props.value;
        this.state.label = this.props.value;
        this.state.colorVisible = 'grey';
    };

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            // Disabling animation
            this.setState({ disabled: this.props.disabled });
            if(this.props.disabled === true) {
                this.state.colorVisible = 'grey';
            } else {
                this.state.colorVisible = this.state.colorVisibleArchive;
            }

            // Update lbl
            this.setState({ value: nextProps.value});
            this.setState({ label: nextProps.value});
        }
    };

    onSlidingComplete = (value) => {
        this.props.onDragStop({color: this.props.colorAssigned, value});
        this.setState({ value: value});
        this.setState({ label: value});
    };

    onValueChange = (input) => {
        this.setState({ label: input.value});
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
                    disabled={this.state.disabled}
                    style={{marginTop: 15, height: this.props.bubbleSize}}
                    thumbStyle={{
                        width: this.props.bubbleSize,
                        height: this.props.bubbleSize,
                        borderRadius: this.props.bubbleSize / 2
                    }}
                    value={this.props.value}
                    thumbTintColor={this.state.colorVisible}
                    minimumTrackTintColor={this.state.colorVisible}
                    step={1}
                    minimumValue={0}
                    maximumValue={255}
                    onSlidingComplete={(value) => this.onSlidingComplete(value)}
                    onValueChange={(value) => this.onValueChange({color: this.props.colorAssigned, value}) }
                />
                <Text>{this.props.labelText} {this.state.label}</Text>
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
    disabled: true,
};

export default ColorSlider;