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
            <Text style={{ color: "#a7a7a7", fontSize: 17 }}>
              {this.props.team}
            </Text>
            <Text style={{ marginTop: 8, fontSize: 15, color: "#696969" }}>
            "{this.props.comment}"
            </Text>
            
            <Text style={{ marginTop: 5, fontSize: 12, color: "#696969" }} >담당 고객 : {this.props.clientNum}명</Text>
            <Text style={{ marginTop: 5, fontSize: 12, color: "#696969" }}>똑똑 포인트 : {this.props.smartRecommedPoint}</Text>
            
            <Text style={styles.starBox}>
              <Ionicons
                name="ios-star"
                style={{ fontSize: 20, color: "#ffdb00", }}
              />
              {this.props.averageEstimation}
            </Text>
            <Text style={{ color:"#444444", fontSize: 18, position:"absolute", right: 0, bottom: 40}}>{this.props.name} 설계사</Text>
          </View>
        </View>
 
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  boxContainer: {
    width: 370,
    height: 150,
    // margin: 20
  },
  contentsBox: {
    width: 370,
    height: 160,
    // borderTopRightRadius: 10,
    // borderTopLeftRadius: 10,
    backgroundColor: "white"
  },
  imageStyle: {
    position: "absolute",
    left: 12,
    top: 12,
    height: 120,
    width: 120,
    borderRadius: 5
  },
  textViewBox: {
    position: "absolute",
    width: 200,
    height: 150,
    right: 0,
    left : 150,
    top : 12,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  starBox: {
    fontSize: 15,
    color: "#6E6E6E",
    marginTop: 5,
    // position: "absolute",
    // top: 20,
    // right: 20,
    backgroundColor: "white",
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
