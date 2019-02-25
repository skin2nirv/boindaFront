//청구하기 Tap 화면

import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, KeyboardAvoidingView } from "react-native";
import { connect } from "react-redux";
import { ImagePicker, Permissions } from "expo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import md5 from "react-native-md5";
import DateTimePicker from 'react-native-modal-datetime-picker';
// import { getAllExternalFilesDirs } from "react-native-fs";

class ClaimForInsurance extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isDateTimePickerVisible: false,
      claimNumberss : null,
      claimNumbermr : null,
      claimNumberkb : null,
      hash : null,
      uriIndex : "ss",
      image: "https://www.posbill.com/kassensystem-blog/wp-content/themes/miyazaki/assets/images/default-fallback-image.png"
    
    };


  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.setState({
      date
    });
  };

  
 
  static navigationOptions = ({ navigation }) => {
    return {
      title: "보험금 청구",
      headerStyle: { backgroundColor: "#ffdb00" },
      headerTitleStyle: { fontSize: 15, color: "white", fontWeight: "600", fontStyle: "normal", letterSpacing: 0, color: "#535353" }
    };
  };


  fetchHyperledgerRequestForISM() {
    return fetch(
      `http://${this.props.hyperServer}:8080/api/query/queryAllClaimInsurance`
    )
      .then(response => response.json())
      .catch(error => {
        console.error(error);
      });
  };


        
 
  

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    
    await this.fetchHyperledgerRequestForISMss().then(items => {
      this.setState({
        claimNumberss : (JSON.parse(items.response)).length,
      })
    })
    await this.fetchHyperledgerRequestForISMmr().then(items => {
        this.setState({
          claimNumbermr : (JSON.parse(items.response)).length,
      })
    })
    await this.fetchHyperledgerRequestForISMss().then(items => {
          this.setState({
            claimNumberkb : (JSON.parse(items.response)).length,
        })
      // console.log(this.state.claimNumber)
    })

    await this.setState({
      claimNumber : 
      (this.state.claimNumberkb + this.state.claimNumberss + this.state.claimNumbermr) 
    })

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    
    if(dd<10) {
      dd='0'+dd
    } 
    if(mm<10) {
        mm='0'+mm
    } 
    today = mm+'/'+dd+'/'+yyyy;

    console.log("item :" + this.props.ChoiceInsurance)







    this.setState({
      today 
    }) 
    console.log(this.state.UriIndex)
  }

  render() {
    var item = this.props.ChoiceInsurance;
    var insuranceCo = item.insuranceCo
    if(insuranceCo == "삼성"){      
        uriIndex = "ss"   
     }else if(insuranceCo == "메리츠"){  
        uriIndex = "mr"
     }else{
         uriIndex = "kb"   
  }

 

    return (
      <KeyboardAvoidingView behavior="padding">
      <View style={styles.container}> 
              <View style={{ width: "100%", height: 250 }}>
          <Image
            source={{ uri : this.state.image }}
            style={{ width: "100%", height: 250 }}
          />
          <TouchableOpacity style={styles.addImage} onPress={this._pickImage}>
            <EvilIcons name="pencil" style={{ fontSize: 40 }} />
          </TouchableOpacity>
        </View>



        <View style={styles.textBox}>
          <Text style={{  }}>{this.props.UserInfo.name}</Text>
        </View>

        <TouchableOpacity
          style={styles.textInputBox}
          onPress={() => {
            this.props.navigation.navigate("InsuranceChoiceScreen");
          }}
        >
        <Text> {item.name || "보험선택 click"} </Text>
          <Text style={{position:'absolute', right: 10, fontSize:15}}> > </Text>
         </TouchableOpacity>
        <TextInput 
        style={styles.textInputBox} 
        placeholder="사고이름 ex) 교통사고"
        onChangeText={text =>
          this.setState({
            accidentName : text
          })}/>

       

       

        <TouchableOpacity style={styles.textInputBox} onPress={this._showDateTimePicker}>
           <Text >사고일자 click</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />

        <View style={{ height: 30 }} />
        {/* <View style={{ width: 300, height: 300 }}>
          <Image
            source={{ uri: this.state.image }}
            style={{ borderRadius: 30, width: 290, height: 290 }}
          />
          <TouchableOpacity style={styles.addImage} onPress={this._pickImage}>
            <EvilIcons name="pencil" style={{ fontSize: 40 }} />
          </TouchableOpacity>
        </View> */}
        <View style={styles.buttonBox}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              if (
                this.state.image ==
                "https://www.posbill.com/kassensystem-blog/wp-content/themes/miyazaki/assets/images/default-fallback-image.png"
              ) {
                return alert("연필모양을 눌러 영수증을 등록해주세요");
              } else {

               console.log("item.insuranceCo :" + item.insuranceCo)
               console.log("uriIndex :" + uriIndex)
                fetch(`http://${this.props.hyperServer}:8080/api/invoke/${uriIndex}/claim`, {
                  method: 'POST',
                  body: JSON.stringify({
                      "Key" : String("Claim"+ (this.state.claimNumber+ 1)),
                      "accidentName" : String(this.state.accidentName),
                      "accidentDay": String(this.state.date),
                      "requestDay": String(this.state.today),
                      "accidentNum": String("a0df0f0"+(this.state.claimNumber + 1)),
                      "insuranceName": String(item.name),
                      "insuranceCo": String(item.insuranceCo),
                      "stateReceive": "false",
                      "userId": 'user1', 
                      "image": String(this.state.hash) 
                  }),
                  headers:{
                    "Content-Type" : "application/json"
                  }
                })
                .then( alert("증권 등록에 성공하였습니다."))
                .then(this.props.navigation.navigate('Home', {
                  onBack: () => this.refresh()
                } ))


              }
            }}
          >
            <Text> 영수증 등록하기 </Text>
          </TouchableOpacity>
         </View> 
        </View>
      </KeyboardAvoidingView>
      
    );
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64 : true,
      allowsEditing: true,
      aspect: [4, 3]
    });
    // console.log(result);
    if (!result.cancelled) {
     await this.setState({
        image: result.uri,
        base64 : result.base64
      });
      let b64_md5v = md5.b64_md5(this.state.base64);
      this.setState({
        hash : b64_md5v
      })
      // console.log(">>>>b64_md5:", b64_md5v);
      // console.log("hash :" + this.state.hash)
      // console.log("item: " + item)

    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  textBox: {
    marginTop:13,
    height: 50,
    width: 330,
    justifyContent: "center",
    paddingLeft : 30 ,
    alignItems: "flex-start",
    backgroundColor: "#e6e6e6",
    borderColor: "#D8D8D8",
    borderWidth: 1
  },
  textInputBox : {
    marginTop:13,
    height: 50,
    width: 330,
    justifyContent: "center",
    paddingLeft : 30 ,
    alignItems: "flex-start",
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
    bottom: 15,
    right: 15,
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
    borderColor: "#ffdb00",
    borderWidth: 1.5
  }
});

const mapStateToProps = state => {
  return {
    hyperServer : state.hyperServer,
    UserInfo: state.UserInfo,
    ChoiceInsurance: state.ChoiceInsurance
  };
};

export default connect(mapStateToProps)(ClaimForInsurance);
