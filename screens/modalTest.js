import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import AntDesign from "react-native-vector-icons/AntDesign";
import { connect } from "react-redux";
import _ from "lodash";

class Test extends Component {
  state = {
    isModalVisible: false
  };

  fetchHyperledgerData() {
    return fetch(
      `http://${this.props.hyperServer}:8080/api/query/queryAllPlanners`
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
    }  
  )

    
  }
  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={this._toggleModal}>
          <Text>Show Modal</Text>
        </TouchableOpacity>
        <Modal isVisible={this.state.isModalVisible}>
          <View
            style={{
              paddingLeft: 20,
              height: 500,
              width: 300,
              backgroundColor: "white",
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              left: 18
            }}
          >
            <Text>Hello!</Text>
            <TouchableOpacity
              style={{ position: "absolute", top: 20, right: 20 }}
              onPress={this._toggleModal}
            >
              <AntDesign style={{ fontSize: 20 }} name="closecircleo" />
            </TouchableOpacity>
          </View>
        </Modal>
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
