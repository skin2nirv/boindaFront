import React from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';

export default class RoundButton extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}
                style={this.props.style}>
                <Text style={this.props.textStyle}>
                    {this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}