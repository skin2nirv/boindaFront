import React from 'react';
import { TextInput, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'


export default class TextInputForm extends React.Component {
    render() {
        return (
            <View style={this.props.style}>
                {this.props.icon ?
                    this.props.icon
                    : <AntDesign name={this.props.name} size={20} color='gray'></AntDesign>
                }
                <TextInput
                    style={{ paddingLeft: 7, flex: 1, height: 40 }}
                    underlineColorAndroid="transparent"
                    placeholder={this.props.placeholder}
                    secureTextEntry={this.props.secureTextEntry}
                    returnKeyLabel={this.props.returnKeyLabel}
                    onChangeText={this.props.onChangeText}
                    returnKeyType={this.props.returnKeyType}
                    onSubmitEditing={this.props.onSubmitEditing}
                    value={this.props.value}
                ></TextInput>
            </View>
        )
    }
}