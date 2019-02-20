import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import AntDesign from "react-native-vector-icons/AntDesign";

export default class Test extends Component {
  state = {
    isModalVisible: false
  };

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={this._toggleModal}>
          <Text>Show Modal</Text>
        </TouchableOpacity>
        <Modal isVisible={this.state.isModalVisible}>
          <View
            style={{
              paddingLeft: 20,
              height: 500,
              width: 300,
              backgroundColor: "white",
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              left: 18
            }}
          >
            <Text>Hello!</Text>
            <TouchableOpacity
              style={{ position: "absolute", top: 20, right: 20 }}
              onPress={this._toggleModal}
            >
              <AntDesign style={{ fontSize: 20 }} name="closecircleo" />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}
