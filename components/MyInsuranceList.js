import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class MyInsuranceList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View
        style={{
          flexDirection: "row"
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 200,
            width: "40%"
          }}
        />
        <View>
          <Text>{this.props.name}</Text>
          <Text>{this.props.startDay}</Text>
          <Text>{this.props.contractor}</Text>
          <Text>{this.props.price}</Text>
        </View>
      </View>
    );
  }
}
