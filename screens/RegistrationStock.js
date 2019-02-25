//증권등록하기를 누르면 reducer상의 데이터에가 바뀌어야 하는데 현재 구현을 못한 상태
// dispach 함수 설정하는게 너무 어렵다. 혼자서 하기 힘들듯. 조언 필요.
// 또한 증권등록하기를 누르면 다른 이전화면으로 돌아가도록 구현할 것
// 증권을 추가한 경우 보험(미등록 증권) screen에서 등록한 보험 내역이 사라지나 확인할 것
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Button,
  Image
} from "react-native";

import { ImagePicker, Permissions } from "expo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { connect } from "react-redux";
import _ from "lodash";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import md5 from "react-native-md5";
import Modal from "react-native-modal";
import AntDesign from "react-native-vector-icons/AntDesign";






class RegistrationStock extends React.Component {
  constructor() {
    super();
    this.state = {
      hash: null,
      isModalVisible: false,
      // buffer: null,
      // ipfsHash: null,
      image:
      "https://www.posbill.com/kassensystem-blog/wp-content/themes/miyazaki/assets/images/default-fallback-image.png"
  

    };
  
  }


  static navigationOptions = ({ navigation }) => {
    return {
      title: "증권추가",
      headerStyle: { backgroundColor: "#ffdb00" },
      headerTitleStyle: { fontSize: 15, color: "white", fontWeight: "600", fontStyle: "normal", letterSpacing: 0, color: "#535353" }
    };
  };
  state = {
    isModalVisible: false,
    onPressItem: {}
  };



  //   async componentDidMount() {
  //     const name = this.props.navigation.getParam("name");
  //      const insuranceCo = this.props.navigation.getParam("insuranceCo");
  //      const startDay = this.props.navigation.getParam("startDay");
  //   }
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

  _toggleModal = () =>
  this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    let image = this.state.image;
    var name = this.props.navigation.getParam("name");
    var startDay = this.props.navigation.getParam("startDay");
    var insuranceCo = this.props.navigation.getParam("insuranceCo");
    var UserInsuranceID = this.props.navigation.getParam("UserInsuranceID");
    if(insuranceCo == "삼성"){      
      uriIndex = "ss"   
    }else if(insuranceCo == "메리츠"){  
      uriIndex = "mr"
    }else{
       uriIndex = "kb"   
  }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.viewBox}>
          <View style={styles.insuranceContentBox}>
            <Image
              style={styles.imageStyle}
              source={{ uri: this.companyLogo(insuranceCo) }}
            />
            <View style={styles.boxInBox}>
              <Text style={{ fontSize: 18 }}>{name}</Text>
              <Text style={{ fontSize: 13, marginTop: 3 }}>{startDay}</Text>
            </View>
            <MaterialCommunityIcons
              name="checkbox-marked-outline"
              style={{ position: "absolute", fontSize: 25, right: 20 }}
            />
          </View>
        </View>
        <View style={styles.stockstyle}>
          <View style={{ width: 300, height: 300 }}>
            <Image
              source={{ uri: image }}
              style={{ borderRadius: 30, width: 290, height: 290 }}
            />

            <TouchableOpacity
              style={styles.pencilStyle}
              onPress={this._pickImage}
            >
              <EvilIcons name="pencil" style={{ fontSize: 40 }} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonBox}>
          {/* <TouchableOpacity
            style={styles.buttonPress}
            onPress={()=>{
              if (
                this.state.image ==
                "https://www.posbill.com/kassensystem-blog/wp-content/themes/miyazaki/assets/images/default-fallback-image.png"
              ) {
                return alert("연필모양을 눌러 증권을 등록해주세요");
              } else {                
                fetch(`http://${this.props.hyperServer}:8080/api/invoke/${uriIndex}/stock`, {
                  method: 'POST',
                  body: JSON.stringify({
                    "Key" : "Stock20",
                    "userId" : "user1",
                    "name" : String(name),
                    "image" : this.state.hash,
                    "InsuranceCompany" : insuranceCo
                  }),
                  headers:{
                    "Content-Type" : "application/json"
                  }
                })
                            
                .then(
                  
                  )
                .then(this.props.navigation.navigate('Myinfo'))
                
              }              
            }}
            >
    

    
    
    
            <Text> 증권 등록하기 </Text>
          </TouchableOpacity> */}
          <TouchableOpacity 
          style={styles.buttonPress}
          onPress={()=>{
          if (
            this.state.image ==
            "https://www.posbill.com/kassensystem-blog/wp-content/themes/miyazaki/assets/images/default-fallback-image.png"
          ) {
            return alert("연필모양을 눌러 증권을 등록해주세요");
          } else {
            fetch(`http://${this.props.hyperServer}:8080/api/invoke/${uriIndex}/stock`, {
              method: 'POST',
              body: JSON.stringify({
                "Key" : "Stock20",
                "userId" : "user1",
                "name" : String(name),
                "image" : this.state.hash,
                "InsuranceCompany" : insuranceCo
              }),
              headers:{
                "Content-Type" : "application/json"
              }
            }).then( this._toggleModal() )          
          }}}
          
          >
          <Text>증권등록하기</Text>

          </TouchableOpacity>
        <Modal isVisible={this.state.isModalVisible}>
          <View
            style={{
              paddingLeft: 20,
              height: 400,
              width: 300,
              backgroundColor: "white",
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "flex-start",
              position: "absolute",
              left: 18
            }}
          >
          <Image 
            style={{ borderRadius:5, position:'absolute', top: 30, left: 47,height:200, width: 200}} 
            source={{uri : this.state.image}}/>
 
            <Text style={{marginTop:135 ,marginLeft:10}}>고객님의 증권이 안전하게 등록되었습니다.</Text>
            <TouchableOpacity 
          style={{
            position:'absolute',
            bottom:30,
            left : 25,
            height: 50,
            width: 250,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            borderColor: "#F5DA81",
            borderWidth: 1.5
          }}
          onPress={()=>{
            fetch(`http://${this.props.hyperServer}:8080/api/invoke/coin/user`, {
              method: 'POST',
              body: JSON.stringify({
                "userId" : "user1",
                "coin" : 3,

              }),
              headers:{
                "Content-Type" : "application/json"
              }
            })
            // .then(alert("3코인이 발급되었습니다"))
            .then(this._toggleModal())
            // 
            .then(this.props.navigation.navigate('Myinfo'))
            // 
           }}
       
          >
          <Text>3코인수령하기</Text>

          </TouchableOpacity>


            <TouchableOpacity
              style={{ position: "absolute", top: 20, right: 20 }}
              onPress={this._toggleModal}
            >
              <AntDesign style={{ fontSize: 20 }} name="closecircleo" />
            </TouchableOpacity>
          </View>
        </Modal>
        </View>
      </ScrollView>
    );
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: true,
      aspect: [4, 3]
    });
    // console.log(result);
    if (!result.cancelled) {
      await this.setState({
        image: result.uri,
        base64 : result.base64
      })
      let b64_md5v = md5.b64_md5(this.state.base64);
      this.setState({
        hash : b64_md5v
      })
      // console.log(">>>>b64_md5:", b64_md5v);
      console.log("image uri : " + this.state.image)
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  viewBox: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  insuranceContentBox: {
    height: 70,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#D8D8D8",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20
  },
  imageStyle: {
    width: 50,
    height: 50,
    position: "absolute",
    left: 15,
    borderColor: "#E6E6E6",
    borderWidth: 1,
    borderRadius: 10
  },
  boxInBox: {
    width: "100%",
    paddingLeft: 90,
    flexDirection: "column"
  },
  stockstyle: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  pencilStyle: {
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
    hyperServer : state.hyperServer,
    UserInfo: state.UserInfo,
    RequestForISM: _.sortBy(state.RequestForISM, p => p.requestDay * -1).slice(
      0,
      5
    ),
    UserInsuranceInfo: state.UserInsuranceInfo.slice(0, 5)
  };
};

export default connect(mapStateToProps)(RegistrationStock);
