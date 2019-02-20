import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class HomeRoundButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.props.onPressTopButton}
      >
        <Ionicons
          style={{ fontSize: 30, color: "#F7D358" }}
          name={this.props.name}
        />
        <Text style={{ paddingLeft: 10 }}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: "#F7D358",
    borderWidth: 0.5,
    borderRadius: 25,
    width: 130,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});
