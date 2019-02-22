//
//
//보험데이터 id 세분화하기
//현재 모든 보험의 id가 1111로 동일해서 보험세부내역이 모두 같은 상황
//다양한 보험 보장내역을 만들고 보험 id 세분화해서 각각 보험 마다 보장내용이 다르게 나오게 하기!
//
//
//
//
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import _ from "lodash";

class InsuranceDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "가입보험",
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
    var item = this.props.navigation.getParam("item");
    return (
      <ScrollView style={styles.container}>
        <View style={styles.topImageBox}>
          <Image
            style={{ height: 150, width: 150 }}
            source={{ uri: this.companyLogo(item.insuranceCo) }}
          />
          <Text style={{ fontSize: 18, color: "#424242" }}>{item.name}</Text>
          <Text style={{ paddingTop: 2, fontSize: 13, color: "#BDBDBD" }}>
            {item.startDay}
          </Text>
          <Text style={{ paddingTop: 5, fontSize: 23, color: "red" }}>
            월 {item.price}원
          </Text>
        </View>
        <View style={styles.categoryDivision}>
          <MaterialCommunityIcons
            name="content-paste"
            style={{ fontSize: 20, color: "#F5DA81" }}
          />
          <Text style={{ fontSize: 20, paddingLeft: 5 }}>세부보장내용</Text>
        </View>
        <FlatList
          style={{ width: "100%" }}
          ItemSeparatorComponent={() => <View style={styles.flatListStyle} />}
          data={this.props.InsuranceInfo.guaranteeContents}
          renderItem={({ item }) => (
            <View style={styles.flatListContainerBox}>
              <View style={styles.fisrtTextBox}>
                <Text style={{ fontSize: 18 }}>{item.guranteeName}</Text>
                <Text style={{ fontSize: 13, marginTop: 3 }}>
                  {item.detailContent}
                </Text>
              </View>
              <View style={styles.secondTextBox}>
                <Text style={{ fontSize: 15 }}>{item.detailPrice}</Text>
              </View>
            </View>
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
  topImageBox: {
    height: 250,
    width: "100%",
    borderColor: "#E6E6E6",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  categoryDivision: {
    height: 60,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#FAFAFA"
  },
  flatListStyle: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "grey"
  },
  flatListContainerBox: {
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  fisrtTextBox: {
    width: "100%",
    paddingLeft: 20,
    flexDirection: "column"
  },
  secondTextBox: {
    flexDirection: "column",
    position: "absolute",
    right: 20
  }
});

const mapStateToProps = state => {
  return {
    InsuranceInfo: state.InsuranceInfo
  };
};

export default connect(mapStateToProps)(InsuranceDetail);
