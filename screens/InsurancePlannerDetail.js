//설계사 정보 눌렀을때 설계사 세부정보가 나오는 화면
// UI 미완성

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import _ from "lodash";
import JoininsuranceFlatLists from "../components/JoininsuranceFlatLists";
import CustomerCommentsFlatList from "../components/CustomerCommentsFlatList";

class InsurancePlannerDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "KALON",
      headerStyle: { backgroundColor: "#F5DA81" },
      headerTitleStyle: { fontSize: 22, color: "white" }
    };
  };
  state = {
    isModalVisible: false,
    onPressItem: {}
  };
  componentDidMount() {
    {
      console.log(this.props.DetailPlannerInfo);
    }
  }

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
        <View style={styles.imageBox}>
          <Image
            source={{ uri: this.props.DetailPlannerInfo.uri }}
            style={{ height: 200, width: 150, borderRadius: 10 }}
          />
        </View>
        <View style={styles.textBox}>
          <Text>{this.props.DetailPlannerInfo.name}</Text>
          <Text>{this.props.DetailPlannerInfo.comment}</Text>
          <Text>
            평점 : {this.props.DetailPlannerInfo.averageEstimation} ({" "}
            {this.props.DetailPlannerInfo.clientNum} 명)
          </Text>
        </View>
        <View style={[styles.textBox, { height: 60 }]}>
          <Text>기본정보</Text>
        </View>
        <View style={[styles.textBox, { height: 150 }]}>
          <Text>시작일 : {this.props.DetailPlannerInfo.startDay}</Text>
          <Text>고객수 : {this.props.DetailPlannerInfo.clientNum}</Text>
          <Text>소속팀 : {this.props.DetailPlannerInfo.team}</Text>
          <Text>
            똑똑이 점수 : {this.props.DetailPlannerInfo.smartRecommedPoint}
          </Text>
        </View>
        <View style={[styles.textBox, { height: 60 }]}>
          <Text>최근활동</Text>
        </View>

        <FlatList
          style={{ width: "100%" }}
          ItemSeparatorComponent={() => (
            <View style={styles.ItemSeparatorView} />
          )}
          data={this.props.UserInsuranceInfo}
          renderItem={({ item }) => (
            <JoininsuranceFlatLists
              uri={this.companyLogo(item.insuranceCo)}
              name={item.name}
              startDay={item.startDay}
              price={item.price}
            />
          )}
        />
        <View style={[styles.textBox, { height: 60 }]}>
          <Text>Comment</Text>
        </View>
        <FlatList
          style={{ width: "100%" }}
          ItemSeparatorComponent={() => (
            <View style={styles.ItemSeparatorView} />
          )}
          data={this.props.UserComment}
          renderItem={({ item }) => (
            <CustomerCommentsFlatList
              uri={item.uri}
              username={item.username}
              comment={item.comment}
              start={item.start}
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
  imageBox: {
    height: 230,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  textBox: {
    height: 230,
    width: "100%",
    borderWidth: 1,
    borderColor: "#D8D8D8",
    alignItems: "center",
    justifyContent: "center"
  },
  ItemSeparatorView: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "grey"
  }
});

const mapStateToProps = state => {
  return {
    DetailPlannerInfo: state.DetailPlannerInfo,
    UserInsuranceInfo: state.UserInsuranceInfo,
    UserComment: state.UserComment
  };
};

export default connect(mapStateToProps)(InsurancePlannerDetail);
