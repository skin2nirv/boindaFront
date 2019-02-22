// 홈 Tab에서 사용되는 PlannerFlatList
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import _ from "lodash";

import Ionicons from "react-native-vector-icons/Ionicons";

class HomePlannerFlatList extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItem: "center"
        }}
        onPress={this.props.onPress}
      >
        <Image
          source={{
            uri: this.props.uri
          }}
          style={{ width: 100, height: 100, margin: 8, borderRadius:3 }}
        />
        <Text style={{ color: "#6E6E6E", fontSize: 18, paddingLeft: 10 }}>
          {this.props.team}
        </Text>
        <Text style={{ paddingLeft: 10 }}>{this.props.name} 설계사</Text>
        <Text style={{ paddingLeft: 10, fontSize: 10, color: "#6E6E6E" }}>
          <Ionicons
            name="ios-star"
            style={{ fontSize: 15, color: "#FFBF00" }}
          />
          X{this.props.averageEstimation}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  boxContainer: {
    width: 350,
    height: 200,
    margin: 20
  },
  contentsBox: {
    width: 350,
    height: 150,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: "#F2F2F2"
  },
  imageStyle: {
    position: "absolute",
    left: 20,
    top: 15,
    height: 120,
    width: 100,
    borderRadius: 5
  },
  textViewBox: {
    position: "absolute",
    width: 200,
    height: 150,
    right: 0,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  startBox: {
    fontSize: 15,
    color: "#6E6E6E",
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "white",
    paddingRight: 5,
    paddingLeft: 5
  },
  motoTextBox: {
    width: 350,
    height: 50,
    borderBottomEndRadius: 10,
    borderColor: "#F2F2F2",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default HomePlannerFlatList;
