//검색결과화면

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import _ from "lodash";
import { FlatList } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import PlannerFlatList from "../components/PlannerFlatList";

class SearchPlanner extends React.Component {
  state = {};
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: { backgroundColor: "#F5DA81", justifyContent: "flex-start" }
    };
  };

  componentDidMount() {
    this.setState({
      PlannerInfo: _.filter(this.props.PlannerInfo, {
        name: this.props.SearchingIndex
      })
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.spaceView} />

        <ScrollView style={{ width: "100%" }}>
          <View style={styles.firstViewBox} />
          <FlatList
            style={{ width: "100%" }}
            contentContainerStyle={{ alignItems: "center" }}
            data={this.state.PlannerInfo}
            renderItem={({ item }) => (
              <PlannerFlatList
                onPress={() => {
                  this.props.navigation.navigate("InsurancePlannerDetail"),
                    this.props.dispatch({
                      type: "ADD_PLANNER_DETAIL",
                      item: item
                    });
                }}
                item={item}
                uri={item.uri}
                team={item.team}
                name={item.name}
                clientNum={item.clientNum}
                smartRecommedPoint={item.smartRecommedPoint}
                averageEstimation={item.averageEstimation}
                comment={item.comment}
              />
            )}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  },
  spaceView: {
    flexDirection: "row",
    height: 50,
    width: "100%",
    justifyContent: "center"
  },
  firstViewBox: {
    borderTopColor: "#F2F2F2",
    borderTopWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 20
  }
});

const mapStateToProps = state => {
  return {
    PlannerInfo: state.PlannerInfo,
    SearchingIndex: state.SearchingIndex
  };
};

export default connect(mapStateToProps)(SearchPlanner);
