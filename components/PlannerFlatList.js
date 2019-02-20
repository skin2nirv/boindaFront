// 설계사 Tab에서 사용되는 PlannerFlatList
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import _ from "lodash";

import Ionicons from "react-native-vector-icons/Ionicons";

class PlannerFlatList extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.boxContainer}
        onPress={this.props.onPress}
      >
        <View style={styles.contentsBox}>
          <Image style={styles.imageStyle} source={{ uri: this.props.uri }} />
          <View style={styles.textViewBox}>
            <Text style={{ color: "#585858", fontSize: 20 }}>
              {this.props.team}
            </Text>
            <Text>{this.props.name} 설계사</Text>
            <Text>담당 고객 : {this.props.clientNum}명</Text>
            <Text>똑똑포인트 : {this.props.smartRecommedPoint}</Text>
            <Text style={styles.starBox}>
              <Ionicons
                name="ios-star"
                style={{ fontSize: 20, color: "#FFBF00" }}
              />
              X{this.props.averageEstimation}
            </Text>
          </View>
        </View>
        <View style={styles.motoTextBox}>
          <Text style={{ fontSize: 20, color: "#585858" }}>
            "{this.props.comment}"
          </Text>
        </View>
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

export default PlannerFlatList;
