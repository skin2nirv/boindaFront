//New 세부 정보
import React, { Component } from "react";
import { WebView } from "react-native";

export default class MyWeb extends Component {
  itemId = this.props.navigation.getParam("itemUri");
  render() {
    return <WebView source={{ uri: this.itemId }} style={{ marginTop: 20 }} />;
  }
}
