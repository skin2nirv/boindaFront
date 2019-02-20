// myinfo 화면에서 보험금 청구내역 더보기 누르면 나오는 화면
import React from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import { connect } from "react-redux";
import Entypo from "@expo/vector-icons/Entypo";

import ModalFlatList from "../components/ModalFlatList";

class MoreScreenOfClaim extends React.Component {
  state = {
    isModalVisible: false,
    onPressItem: {}
  };

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });
  companyLogo(companyName) {
    if (companyName == "삼성") {
      return "https://t1.daumcdn.net/news/201706/22/sfdirect/20170622162421882zmiv.jpg";
    } else if (companyName == "국민")
      return "https://yt3.ggpht.com/a-/AN66SAxGY8-zefx7A2NaQGRgY0SIm20xE2vr4aIGCg=s900-mo-c-c0xffffffff-rj-k-no";
    else if (companyName == "메리츠")
      return "http://image.nsmall.com/itemimg/3/26/963/26451963_S.jpg";
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.textBox}>
          <Entypo
            name="export"
            style={{ fontSize: 18, paddingRight: 3, color: "#F5DA81" }}
          />
          <Text style={{ fontSize: 18, color: "grey" }}>보험금청구내역></Text>
        </View>
        <FlatList
          style={{ width: "100%" }}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSeparatorView} />
          )}
          data={this.props.RequestForISM}
          renderItem={({ item }) => (
            <ModalFlatList
              onPress={() => {
                this.setState(
                  {
                    onPressItem: item
                  },
                  this._toggleModal
                );
              }}
              isVisible={this.state.isModalVisible}
              uri={this.companyLogo(this.state.onPressItem.insuranceCo)}
              accidentName={this.state.onPressItem.accidentName}
              accidentDay={this.state.onPressItem.accidentDay}
              requestDay={this.state.onPressItem.requestDay}
              insuranceName={this.state.onPressItem.insuranceName}
              stateReceive={
                this.state.onPressItem.stateReceive == false
                  ? "미지급"
                  : this.state.onPressItem.stateReceive
              }
              onPressToggle={this._toggleModal}
              companyLogo={this.companyLogo(item.insuranceCo)}
              secondAccidentName={item.accidentName}
              secondAccidentDay={item.accidentDay}
              secondStateReceive={
                item.stateReceive ? "+" + item.stateReceive : "미지급"
              }
            />
          )}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  textBox: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  itemSeparatorView: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "grey"
  }
});

const mapStateToProps = state => {
  return {
    UserInfo: state.UserInfo,
    RequestForISM: state.RequestForISM,
    UserInsuranceInfo: state.UserInsuranceInfo
  };
};

export default connect(mapStateToProps)(MoreScreenOfClaim);
