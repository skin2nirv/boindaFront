
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import _ from "lodash";
import Modal from "react-native-modal";

class HospitalFlatList extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.boxContainer}>
        <Image style={styles.userImage} source={{ uri: this.props.uri }} />
        <View style={styles.textBox}>
          <Text style={{ fontSize: 18 }}>{this.props.username}</Text>
          <Text style={{ fontSize: 13, marginTop: 3 }}>
            {this.props.comment}
          </Text>
        </View>
        <View style={styles.starBox}>
          <Text style={{ fontSize: 10 }}> 진료일 : {this.props.start} </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  boxContainer: {
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  userImage: {
    width: 50,
    height: 50,
    position: "absolute",
    left: 15,
    borderColor: "#E6E6E6",
    borderWidth: 1,
    borderRadius: 25
  },
  textBox: {
    width: "100%",
    paddingLeft: 90,
    flexDirection: "column"
  },
  starBox: {
    flexDirection: "column",
    position: "absolute",
    right: 20,
    top: 15
  }
});

export default HospitalFlatList;
