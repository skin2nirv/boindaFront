//로그인 화면

import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default class Login extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "KALON",
      headerStyle: { backgroundColor: "#F5DA81" },
      headerTitleStyle: { fontSize: 22, color: "white" },
      headerRight: (
        <TouchableOpacity
          style={{
            flexDirection: "column",
            alignItems: "center",
            paddingRight: 20
          }}
          onPress={() => navigation.navigate("Home")}
          //왜 goBack()이 안 먹히지??
        >
          <Text style={{ fontSize: 10, color: "white" }}>뒤로가기</Text>
        </TouchableOpacity>
      )
    };
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Login SCREEN!</Text>
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
