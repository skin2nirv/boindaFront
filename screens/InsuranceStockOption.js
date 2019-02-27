//증권 추가하기 누르면 미등록 증권 보험 내역을 보여주는 화면

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import _ from "lodash";
import JoininsuranceFlatLists from "../components/JoininsuranceFlatLists";

class InsuranceStockOption extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "증권추가",
      headerStyle: { backgroundColor: "#ffdb00" },
      headerTitleStyle: { fontSize: 15, color: "white", fontWeight: "600", fontStyle: "normal", letterSpacing: 0, color: "#535353" }
    };
  };
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
      <View style={styles.container}>
        <View style={styles.textBox}>
          <Text style={{ fontSize: 20 }}>보험</Text>
          <Text>(미등록 증권)</Text>
        </View>
        <View style={styles.separatorLine} />
        <FlatList
          keyExtractor={(index, item) => index + item}
          style={{ width: "100%" }}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSeparatorLine} />
          )}
          data={this.props.UserInsuranceInfo}
          renderItem={({ item }) => (
            <JoininsuranceFlatLists
              onPress={() =>
                this.props.navigation.navigate("RegistrationStock", {
                  name: item.name,
                  startDay: item.startDay,
                  insuranceCo: item.insuranceCo,
                  UserInsuranceID: item.UserInsuranceID
                })
              }
              uri={this.companyLogo(item.insuranceCo)}
              name={item.name}
              startDay={item.startDay}
              price={item.price}
            />
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    UserInfo: state.UserInfo,
    RequestForISM: _.sortBy(state.RequestForISM, p => p.requestDay * -1).slice(
      0,
      5
    ),
    //_.filter(users, ['active', false]);
    UserInsuranceInfo: _.filter(state.UserInsuranceInfo, [
      "insurancStock",
      false
    ])
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  textBox: {
    height: 70,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 15
  },
  separatorLine: {
    height: 2,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#F5DA81"
  },
  itemSeparatorLine: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "grey"
  }
});

export default connect(mapStateToProps)(InsuranceStockOption);
