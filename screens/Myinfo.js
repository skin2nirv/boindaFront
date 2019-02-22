import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";
import { ImagePicker, Permissions } from "expo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { connect } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import _ from "lodash";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ModalFlatList from "../components/ModalFlatList";
import JoininsuranceFlatLists from "../components/JoininsuranceFlatLists";

class Myinfo extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "내정보",
      headerStyle: { backgroundColor: "#ffdb00" },
      headerTitleStyle: { fontSize: 15, color: "white", fontWeight: "600", fontStyle: "normal", letterSpacing: 0, color: "#535353" }
    };
  };
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

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  }
  render() {
    let { image } = this.props.UserInfo;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.privateDataBox}>
          <View style={{ width: 105, height: 105 }}>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ borderRadius: 30, width: 100, height: 100 }}
              />
            )}
            <TouchableOpacity
              style={styles.pencilBox}
              onPress={this._pickImage}
            >
              <EvilIcons
                name="pencil"
                style={{
                  fontSize: 20
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.nameBox}>
            <Text style={{ fontSize: 25 }}>{this.props.UserInfo.name}</Text>
            <View style={styles.emailBox}>
              <Text style={{ fontSize: 15 }}>{this.props.UserInfo.email}</Text>
            </View>
          </View>
        </View>
        <View style={styles.threeButtonBox}>
          <TouchableOpacity
            style={[
              styles.threeButton,
              {
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10
              }
            ]}
            onPress={() =>
              this.props.navigation.navigate("InsuranceStockOption")
            }
          >
            <Text style={{ textAlign: "center" }}>증권추가</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.threeButton}
            onPress={() => this.props.navigation.navigate("CoinInfo")}
          >
            <Text style={{ textAlign: "center" }}>보유코인</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.threeButton,
              {
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10
              }
            ]}
            onPress={() => this.props.navigation.navigate("PrivateData")}
          >
            <Text style={{ textAlign: "center" }}>개인정보</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.claimText}>
          <Entypo
            name="export"
            style={{ fontSize: 18, paddingRight: 3, color: "#F5DA81" }}
          />
          <Text style={{ fontSize: 18, color: "grey" }}>보험금청구내역></Text>
        </View>
        <FlatList
          style={{ width: "100%" }}
          ItemSeparatorComponent={() => <View style={styles.itemSparator} />}
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
        <View style={styles.moreScreenBox} />
        <TouchableOpacity
          style={styles.moreScreenTouch}
          onPress={() => {
            this.props.navigation.navigate("MoreScreenOfClaim");
          }}
        >
          <Text style={{ fontSize: 10 }}>더보기></Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.advertisementBox}
          onPress={() => {
            this.props.navigation.navigate("MyWeb", {
              itemUri: "https://www.kbli.co.kr/CUCO/CUCO10010M.do"
            });
          }}
        >
          <Image
            source={{
              uri:
                "http://insight.kbinsure.co.kr/wp-content/uploads/2018/02/%EB%B0%B0%EB%84%882.png"
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </TouchableOpacity>
        <View style={styles.joinInsuranceBox}>
          <MaterialCommunityIcons
            name="file-import"
            style={{ fontSize: 18, paddingRight: 3, color: "#F5DA81" }}
          />

          <Text style={{ fontSize: 18, color: "grey" }}>가입보험></Text>
        </View>
        <FlatList
          style={{ width: "100%" }}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSeparatorView} />
          )}
          data={this.props.UserInsuranceInfo}
          renderItem={({ item }) => (
            <JoininsuranceFlatLists
              onPress={() =>
                this.props.navigation.navigate("InsuranceDetail", {
                  item: item
                })
              }
              uri={this.companyLogo(item.insuranceCo)}
              name={item.name}
              startDay={item.startDay}
              price={item.price}
            />
          )}
        />
        <View style={styles.moreViewBox} />
        <TouchableOpacity
          style={styles.moreViewTouchBox}
          onPress={() => {
            this.props.navigation.navigate("MoreScreenOfMyInsurance");
          }}
        >
          <Text style={{ fontSize: 10 }}>더보기></Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      this.props.dispatch({
        type: "ADD_USER_IMAGE",
        image: result.uri
      });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  privateDataBox: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  pencilBox: {
    backgroundColor: "white",
    width: 30,
    height: 30,
    position: "absolute",
    borderColor: "#D8D8D8",
    borderWidth: 1,
    bottom: 0,
    right: 0,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  nameBox: {
    height: 100,
    width: "100%",
    paddingTop: 15,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  emailBox: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#F2F2F2",
    borderWidth: 0.5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5
  },
  threeButtonBox: {
    height: 80,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  threeButton: {
    height: 50,
    width: 110,
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
    alignItems: "center"
  },
  claimText: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  itemSparator: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "grey"
  },
  moreScreenBox: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "grey"
  },
  moreScreenTouch: {
    height: 50,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  advertisementBox: {
    height: 100,
    width: "100%",
    borderColor: "#F2F2F2",
    borderWidth: 8,
    backgroundColor: "#F7F8E0",
    flexDirection: "row"
  },
  joinInsuranceBox: {
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
  },
  moreViewBox: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "grey"
  },
  moreViewTouchBox: {
    height: 50,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 5,
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  return {
    UserInfo: state.UserInfo,
    RequestForISM: _.sortBy(state.RequestForISM, p => p.requestDay * -1).slice(
      0,
      5
    ),
    UserInsuranceInfo: state.UserInsuranceInfo
  };
};

export default connect(mapStateToProps)(Myinfo);
