//탈퇴하기 눌렀을 때 나오는 화면

import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class LeaveServce extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>가입도 안 하고 탈퇴하려고요?? 어림없어요</Text>
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
