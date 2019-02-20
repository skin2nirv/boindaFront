//개인정보 이용내역 눌렀을 때 나오는 화면
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class PersonalInfomationUsageHistory extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>저희는 아직 개인정보를 활용하지 않고 있습니다.</Text>
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
