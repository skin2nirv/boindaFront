
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";


class JoininsuranceFlatLists extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.boxContainer}
        onPress={this.props.onPress}
      >
        <Image style={styles.imageBox} source={{ uri: this.props.uri }} />
        <View style={styles.textBox}>
          <Text style={{ fontSize: 18 }}>{this.props.name}</Text>
          <Text style={{ fontSize: 13, marginTop: 3 }}>
            {this.props.startDay}
          </Text>
        </View>
        <View style={styles.priceBox}>
          <Text style={{ fontSize: 12 }}>{this.props.price}원 </Text>
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
  imageBox: {
    width: 50,
    height: 50,
    position: "absolute",
    left: 15,
    borderColor: "#E6E6E6",
    borderWidth: 1,
    borderRadius: 10
  },
  textBox: {
    width: "100%",
    paddingLeft: 90,
    flexDirection: "column"
  },
  priceBox: {
    flexDirection: "column",
    position: "absolute",
    right: 20
  }
});

export default JoininsuranceFlatLists;
