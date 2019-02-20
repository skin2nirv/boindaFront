import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";

export default class CoinInfo extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "KALON",
      headerStyle: { backgroundColor: "#F5DA81" },
      headerTitleStyle: { fontSize: 22, color: "white" },
      headerRight: (
        <TouchableOpacity
          style={styles.headerStyle}
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
        <Text>서비스 준비중</Text>
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
  },
  headerStyle: {
    flexDirection: "column",
    alignItems: "center",
    paddingRight: 20
  }
});
