// Myinfo에서 개인정보버튼 누르면 나오는 화면
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { ImagePicker, Permissions } from "expo";

class PrivateData extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "개인정보",
      headerStyle: { backgroundColor: "#ffdb00" },
      headerTitleStyle: { fontSize: 15, color: "white", fontWeight: "600", fontStyle: "normal", letterSpacing: 0, color: "#535353" }
    };
  };
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  }
  render() {
    let { image } = this.props.UserInfo;
    return (
      <ScrollView style={styles.container}>
        <View style={{ height: 5, width: "100%" }} />
        <View style={styles.imageBox}>
          <View style={{ width: 105, height: 105 }}>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ borderRadius: 30, width: 100, height: 100 }}
              />
            )}
            <TouchableOpacity
              style={styles.pencilStyle}
              onPress={this._pickImage}
            >
              <EvilIcons name="pencil" style={{ fontSize: 20 }} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 5, width: "100%" }} />
        <View style={styles.basicInfoView}>
          <Text style={{ fontSize: 15, position: "absolute", left: 20 }}>
            사용자 기본정보
          </Text>
        </View>
        <View style={{ height: 1, width: "100%" }} />
        <View style={[styles.basicInfoView, { flexDirection: "row" }]}>
          <Text style={styles.basicTextStyle}>사용자 ID</Text>
          <Text style={{ fontSize: 15, position: "absolute", left: 110 }}>
            {this.props.UserInfo.id}
          </Text>
        </View>
        <View style={[styles.basicInfoView, { flexDirection: "row" }]}>
          <Text style={styles.basicTextStyle}>이름</Text>
          <Text style={{ fontSize: 15, position: "absolute", left: 110 }}>
            {this.props.UserInfo.name}
          </Text>
        </View>
        <View style={[styles.basicInfoView, { flexDirection: "row" }]}>
          <Text style={styles.basicTextStyle}>나이</Text>
          <Text style={{ fontSize: 15, position: "absolute", left: 110 }}>
            {this.props.UserInfo.age}
          </Text>
        </View>
        <View style={[styles.basicInfoView, { flexDirection: "row" }]}>
          <Text style={styles.basicTextStyle}>성별</Text>
          <Text style={{ fontSize: 15, position: "absolute", left: 110 }}>
            {this.props.UserInfo.sex}
          </Text>
        </View>
        <View style={{ height: 5, width: "100%" }} />
        <View style={styles.basicInfoView}>
          <Text style={{ fontSize: 15, position: "absolute", left: 20 }}>
            연락처
          </Text>
        </View>
        <View style={{ height: 1, width: "100%" }} />
        <View style={[styles.basicInfoView, { flexDirection: "row" }]}>
          <Text style={styles.basicTextStyle}>기본 이메일</Text>
          <Text style={{ fontSize: 15, position: "absolute", left: 130 }}>
            {this.props.UserInfo.email}
          </Text>
        </View>
        <View style={[styles.basicInfoView, { flexDirection: "row" }]}>
          <Text style={styles.basicTextStyle}>본인확인 이메일</Text>
          <Text style={{ fontSize: 15, position: "absolute", left: 130 }}>
            {this.props.UserInfo.email}
          </Text>
        </View>
        <View style={[styles.basicInfoView, { flexDirection: "row" }]}>
          <Text style={styles.basicTextStyle}>연락처</Text>
          <Text style={{ fontSize: 15, position: "absolute", left: 130 }}>
            {this.props.UserInfo.phonenumber}
          </Text>
        </View>
        <View style={{ height: 5, width: "100%" }} />
        <View style={[styles.basicInfoView, { flexDirection: "row" }]}>
          <Text style={{ fontSize: 15, position: "absolute", left: 20 }}>
            개인정보이용내역
          </Text>
        </View>
        <View style={{ height: 1, width: "100%" }} />
        <View style={[styles.basicInfoView, { flexDirection: "row" }]}>
          <Text style={styles.basicTextStyle}>
            내 개인정보가 어떻게 사용되고 있는지 확인해 보세요.
          </Text>
        </View>
        <View style={[styles.basicInfoView, { flexDirection: "row" }]}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              this.props.navigation.navigate("PersonalInformationUsageHistory");
            }}
          >
            <Text style={{ color: "white" }}>조회하기</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 5, width: "100%" }} />
        <View style={styles.basicInfoView}>
          <Text style={{ fontSize: 15, position: "absolute", left: 20 }}>
            회원탈퇴
          </Text>
        </View>
        <View style={{ height: 1, width: "100%" }} />
        <View style={[styles.basicInfoView, { flexDirection: "row" }]}>
          <Text style={styles.basicTextStyle}>
            KALON을 더 이상 이용하지 않을 경우 회원탈퇴를
          </Text>
        </View>
        <View style={[styles.basicInfoView, { flexDirection: "row" }]}>
          <Text style={[styles.basicTextStyle, { bottom: 40 }]}>
            진행해 주세요.
          </Text>
        </View>
        <View style={[styles.basicInfoView, { flexDirection: "row" }]}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              this.props.navigation.navigate("LeaveServce");
            }}
          >
            <Text style={{ color: "white" }}>탈퇴하기</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: "#E6E6E6"
  },
  imageBox: {
    height: 200,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  pencilStyle: {
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
  basicInfoView: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  basicTextStyle: {
    color: "#A4A4A4",
    fontSize: 15,
    position: "absolute",
    left: 20
  },
  buttonStyle: {
    backgroundColor: "#A4A4A4",
    position: "absolute",
    left: 20,
    bottom: 12,
    width: 120,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  return {
    UserInfo: state.UserInfo,
    UserInsuranceInfo: state.UserInsuranceInfo
  };
};

export default connect(mapStateToProps)(PrivateData);
