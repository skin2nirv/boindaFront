// Myinfo Tab에서 사용되는 PlannerFlatList
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import _ from "lodash";
import Modal from "react-native-modal";

class ModalFlatList extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.boxContainer}
        onPress={this.props.onPress}
      >
        <Modal isVisible={this.props.isVisible}>
          <View style={styles.modalStyle}>
            <AntDesign
              style={{ fontSize: 30, color: "#F5DA81", marginBottom: 10 }}
              name="customerservice"
            />
            <Text style={{ fontSize: 20 }}>청구세부내역</Text>
            <Image
              style={styles.imageStyle}
              source={{
                uri: this.props.uri
              }}
            />
            <View style={{ width: "100%" }}>
              <Text style={styles.restText}>
                사고내역 : {this.props.accidentName}
              </Text>
              <View style={styles.seperateLine} />
              <Text style={styles.restText}>
                사고일자 : {this.props.accidentDay}
              </Text>
              <View style={styles.seperateLine} />
              <Text style={styles.restText}>
                요청일자 : {this.props.requestDay}
              </Text>
              <View style={styles.seperateLine} />
              <Text style={styles.restText}>
                현설계사 : {this.props.insuranceName}
              </Text>
              <View style={styles.seperateLine} />
              <Text style={styles.restText}>
                지급상황 : {this.props.stateReceive}
              </Text>
            </View>
            <TouchableOpacity
              style={{ position: "absolute", top: 20, right: 20 }}
              onPress={this.props.onPressToggle}
            >
              <AntDesign style={{ fontSize: 20 }} name="closecircleo" />
            </TouchableOpacity>
          </View>
        </Modal>
        <Image
          style={styles.companyLog}
          source={{ uri: this.props.companyLogo }}
        />
        <View style={styles.secondTextBox}>
          <Text style={{ fontSize: 18 }}>{this.props.secondAccidentName}</Text>
          <Text style={{ fontSize: 13, marginTop: 3 }}>
            {this.props.secondAccidentDay}
          </Text>
        </View>
        <View style={styles.lastTextBox}>
          <Text style={{ fontSize: 15 }}>{this.props.secondStateReceive}</Text>
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
  modalStyle: {
    paddingLeft: 20,
    height: 500,
    width: 300,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 18
  },
  imageStyle: {
    width: 100,
    height: 100,
    marginBottom: 40,
    marginTop: 20,
    borderColor: "#E6E6E6",
    borderWidth: 1,
    borderRadius: 10
  },
  seperateLine: {
    height: StyleSheet.hairlineWidth,
    marginRight: 17,
    backgroundColor: "grey"
  },
  companyLog: {
    width: 50,
    height: 50,
    position: "absolute",
    left: 15,
    borderColor: "#E6E6E6",
    borderWidth: 1,
    borderRadius: 10
  },
  secondTextBox: {
    width: "100%",
    paddingLeft: 90,
    flexDirection: "column"
  },
  lastTextBox: {
    flexDirection: "column",
    position: "absolute",
    right: 20
  },
  restText: { fontSize: 20, padding: 5 }
});

export default ModalFlatList;
