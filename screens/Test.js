import React, { Component } from "react";
import { Text, TouchableOpacity, View,FlatList } from "react-native";
import Modal from "react-native-modal";
import AntDesign from "react-native-vector-icons/AntDesign";
import { connect } from "react-redux";
import _ from "lodash";

class Test extends Component {
  state = {
    isModalVisible: false,
    addCoin : 30,
    user1Coininfo : null

  };

  fetchHyperledgerData() {
    return fetch(
      `http://${this.props.hyperServer}:8080/api/query/queryAllUserCoins`
    )
      .then(response => response.json())
      .catch(error => {
        console.error(error);
      });
  }

  componentDidMount = async() =>{

    await this.fetchHyperledgerData().then(items => {
      this.props.dispatch({
        type: "ADD_PlannerInfo",
        PlannerInfo: JSON.parse(items.response),
      })
    })
    await this.setState({
      user1Coininfo : this.props.PlannerInfo.find('user1')

    })

    console.log("user1 CoinInfo : " + this.state.user1Coininfo)
    

    
  }
  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
       <FlatList style={{  height: 100, width: "100%" }}
            data={this.props.PlannerInfo}
            ItemSeparatorComponent={ () => (
              <View style={{
                height: 50,
                // marginLeft:20, 
              }} />
            )}
            renderItem={({ item }) => (
              <Text>{item.coin}</Text>

            )}
            ></FlatList>
        <TouchableOpacity 
        style={{height:200, width: 300, backgroundColor : 'green'}}
        onPress={()=>
          fetch(`http://${this.props.hyperServer}:8080/api/invoke/coin/user`, {
                  method: 'POST',
                  body: JSON.stringify({
                    "addcoin" : 30
                  }),
                  headers:{
                    "Content-Type" : "application/json"
                  }
                  })
          }>
        </TouchableOpacity>    
      
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    testValue : state.testValue,
    RequestForISM : state.RequestForISM,
    hyperServer : state.hyperServer,
    InsuranceInfo: state.UserInsuranceInfo,
    PlannerInfo: state.PlannerInfo,
    News: state.News,
    InsuranceNews: state.InsuranceNews,
    topPlanner: _.sortBy(
      state.PlannerInfo.Record,
      p => p.averageEstimation * -1
    ).slice(0, 5)
  };
};

export default connect(mapStateToProps)(Test);
