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
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import _ from "lodash";
import JoininsuranceFlatLists from "../components/JoininsuranceFlatLists";
import CustomerCommentsFlatList from "../components/CustomerCommentsFlatList";
import Ionicons from "react-native-vector-icons/Ionicons";
import PureChart from 'react-native-pure-chart';


class InsurancePlannerDetailBackHome extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "설계사 리스트",
      headerStyle: { backgroundColor: "#ffdb00" },
      headerTitleStyle: { fontSize: 15, color: "white", fontWeight: "600", fontStyle: "normal", letterSpacing: 0, color: "#535353" }
    };
  };

  constructor(props) {
    super(props);
    this.state = { isModalVisible: false,  onPressItem: {}}
  }



  
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
          <View style = {{ height: 150, width:"65%", paddingLeft: 26, justifyContent:'flex-start', alignItems:'flex-start'}}>
            <Text style={{fontSize:19, marginTop: 20, color:"#444444"}}>{this.props.DetailPlannerInfo.name} 설계사</Text>
            <Text style={{fontSize:13, marginTop: 18, color:"#696969"}}>담당고객 : {this.props.DetailPlannerInfo.clientNum} 명</Text>
            <Text style={{fontSize:13, marginTop: 4, color:"#696969"}}>
            똑똑 포인트 : {this.props.DetailPlannerInfo.smartRecommedPoint}
            </Text>
            <Text style={{fontSize:13, marginTop: 4, color:"#696969"}}>
            <Ionicons
                name="ios-star"
                style={{ fontSize: 20, color: "#ffdb00", }}
              />{" "}
              {this.props.DetailPlannerInfo.averageEstimation}
              
            </Text>

            </View>

          <View style = {{width:"35%"}}>
            <Image
              source={{ uri: this.props.DetailPlannerInfo.uri }}
              style={{ height: 120, width: 120, borderRadius: 3 }}
            />
          </View>
        </View>

        <View style={styles.textBox}>
 
          <Text style={{fontSize:20, marginTop: 4, color:"#444444"}}>설계사님 한마디</Text>
          <Text style={{marginLeft:1,fontSize:15, marginTop: 10, color:"#696969"}}>{this.props.DetailPlannerInfo.comment}</Text>

        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity style={styles.buttonPress}>
            <Text> 보험설계 신청하기 </Text>
          </TouchableOpacity>
        </View>
        <View style ={{marginLeft:10, marginRight:10, height: 0.5, backgroundColor:"#d8d8d8"}}/>
        <View style={[styles.textBox, { height: 40 }]}>
          <Text>성과정보</Text>
        </View>
        <View style={[styles.textBox, { height: 225 }]}>

          {/* <Text>시작일 : {this.props.DetailPlannerInfo.startDay}</Text>
          <Text>고객수 : {this.props.DetailPlannerInfo.clientNum}</Text>
          <Text>소속팀 : {this.props.DetailPlannerInfo.team}</Text>
          <Text>
            똑똑이 점수 : {this.props.DetailPlannerInfo.smartRecommedPoint}
          </Text> */}
        
  <PureChart data={
 [
  {seriesName: 'series1', 
  data: [
    this.props.DetailPlannerInfo.carPoint, 
    this.props.DetailPlannerInfo.guaranteePoint,
    this.props.DetailPlannerInfo.babyPoint,
    this.props.DetailPlannerInfo.savePoint,], color: '#ffdb00'},
  
]
   } type='bar' />
  <View style={{flexDirection:'row'}}>
  <View style={{ marginLeft: 40, width : 40}}>
    <Text style={{textAlign:'center'}}>자동차 보험
    </Text>
    </View>
    <View style={{ marginLeft: 19, width : 40}}>
    <Text style={{textAlign:'center'}}>보장성 보험
    </Text>
    </View>
    <View style={{ marginLeft: 20, width : 40}}>
    <Text style={{textAlign:'center'}}>태아 보험
    </Text>
    </View>
    <View style={{ marginLeft: 20, width : 40}}>
    <Text style={{textAlign:'center'}}>저축성 보험
    </Text>
    </View>
  </View>


        </View>
        <View style ={{marginLeft:10, marginRight:10, height: 0.5, backgroundColor:"#d8d8d8"}}/>
        <View style={[styles.textBox, { height: 45 }]}>
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
    flexDirection: 'row',
    height: 150,
    width: "100%",
    alignItems: "center",
    // justifyContent: "center"
  },
  textBox: {
    paddingTop: 20,
    paddingLeft:30,
    height: 100,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  ItemSeparatorView: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "grey"
  },
  buttonBox: {
    height: 80,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonPress: {
    height: 50,
    width: 250,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "#F5DA81",
    borderWidth: 1.5
  }
});

const mapStateToProps = state => {
  return {
    DetailPlannerInfo: state.DetailPlannerInfo,
    UserInsuranceInfo: state.UserInsuranceInfo,
    UserComment: state.UserComment
  };
};

export default connect(mapStateToProps)(InsurancePlannerDetailBackHome);
