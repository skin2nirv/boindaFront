import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class HomeDetail extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>서비스 준비중!!(Homdetail화면 )</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
