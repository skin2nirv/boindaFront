//청구하기 Tap 화면

import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import { ImagePicker, Permissions } from "expo";
import EvilIcons from "react-native-vector-icons/EvilIcons";

class ClaimForInsurance extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "KALON",
      headerStyle: { backgroundColor: "#F5DA81" },
      headerTitleStyle: { fontSize: 22, color: "white" }
    };
  };
  state = {
    image:
      "http://mblogthumb3.phinf.naver.net/MjAxODA2MTVfMjkg/MDAxNTI5MDM2Mzc2NTMx.Ivt22TO6PAHisNnQ0hZr1TGhAKpX0jS3P8DOgd7eUzcg.bOEGQziKBWU89ao2RBaB-eAXGy79kcEu4OC9vMj3lJMg.PNG.stan322/image.png?type=w800"
  };
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  }
  render() {
    var item = this.props.ChoiceInsurance;
    return (
      <View style={styles.container}>
        <View style={styles.textBox}>
          <Text>보험금 청구하기</Text>
        </View>
        <View style={styles.textBox}>
          <Text> 청구자 : {this.props.UserInfo.name}</Text>
        </View>
        <TouchableOpacity
          style={styles.textBox}
          onPress={() => {
            this.props.navigation.navigate("InsuranceChoiceScreen");
          }}
        >
          <Text> {item || "보험선택 click"} </Text>
        </TouchableOpacity>

        <View style={styles.textBox}>
          <Text>보험 영수증 등록하기</Text>
        </View>
        <View style={{ height: 30 }} />
        <View style={{ width: 300, height: 300 }}>
          <Image
            source={{ uri: this.state.image }}
            style={{ borderRadius: 30, width: 290, height: 290 }}
          />
          <TouchableOpacity style={styles.addImage} onPress={this._pickImage}>
            <EvilIcons name="pencil" style={{ fontSize: 40 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              if (
                this.state.image ==
                "http://mblogthumb3.phinf.naver.net/MjAxODA2MTVfMjkg/MDAxNTI5MDM2Mzc2NTMx.Ivt22TO6PAHisNnQ0hZr1TGhAKpX0jS3P8DOgd7eUzcg.bOEGQziKBWU89ao2RBaB-eAXGy79kcEu4OC9vMj3lJMg.PNG.stan322/image.png?type=w800"
              ) {
                return alert("연필모양을 눌러 영수증을 등록해주세요");
              } else {

                fetch('http://192.168.0.9:8080/api/invoke/claim', {
                  method: 'POST',
                  body: JSON.stringify({
                    "Key" : "Stock20",
                      "accidentName" : "교통사고",
                      "accidentDay": "18.06.29",
                      "requestDay": "180629",
                      "accidentNum": "045sD456",
                      "insuranceName": " 김정수",
                      "insuranceCo": "삼성",
                      "stateReceive": false,
                      "userId": 'user1', 
                      "image": '삼성' 

                  }),
                  headers:{
                    "Content-Type" : "application/json"
                  }
                })
                .then( alert("증권 등록에 성공하였습니다."))
                .then(this.props.navigation.navigate('InsuranceStockOption'))


              }
            }}
          >
            <Text> 영수증 등록하기 </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64 : true,
      allowsEditing: true,
      aspect: [4, 3]
    });
    console.log(result);
    if (!result.cancelled) {
      this.setState({
        image: result.uri,
        base64 : result.base64
      });

      let b64_md5v = md5.b64_md5(this.state.base64);

      this.setState({
        hash : b64_md5v
      })
      console.log(">>>>b64_md5:", b64_md5v);
      console.log("hash :" + this.state.hash)

    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  textBox: {
    height: 60,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#D8D8D8",
    borderWidth: 1
  },
  addImage: {
    backgroundColor: "white",
    width: 50,
    height: 50,
    position: "absolute",
    borderColor: "#D8D8D8",
    borderWidth: 1,
    bottom: 0,
    right: 0,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonBox: {
    height: 80,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonStyle: {
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
    UserInfo: state.UserInfo,
    ChoiceInsurance: state.ChoiceInsurance
  };
};

export default connect(mapStateToProps)(ClaimForInsurance);
