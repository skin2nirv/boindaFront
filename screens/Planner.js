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

class Planner extends React.Component {
  state = {
    index: 1
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: { backgroundColor: "#F5DA81", justifyContent: "flex-start" }
    };
  };

  componentDidMount() {
    this.setState({
      PlannerInfo: this.props.PlannerInfo
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.secondContainer}>
          <TextInput
            style={styles.searchBarContainer}
            onChangeText={text =>
              this.props.dispatch({
                type: "ADD_SEARCH_INDEX",
                SearchingIndex: text
              })
            }
            onSubmitEditing={() =>
              this.props.navigation.navigate("SearchPlanner")
            }
          />
          <Ionicons style={styles.searchIconContainer} name="ios-search" />
        </View>
        <View style={styles.categoryBox}>
          <TouchableOpacity
            style={[
              styles.basicCategoryButton,
              { borderBottomColor: this.state.index == 1 ? "#F5DA81" : "white" }
            ]}
            onPress={() => {
              this.setState({ index: 1 }, () =>
                this.setState({
                  PlannerInfo: _.sortBy(
                    this.props.PlannerInfo,
                    p => p.averageEstimation * -1
                  )
                })
              );
            }}
          >
            <Text
              style={{ color: this.state.index == 1 ? "#F5DA81" : "#BDBDBD" }}
            >
              별점순
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.basicCategoryButton,
              {
                borderBottomColor: this.state.index == 2 ? "#F5DA81" : "white"
              }
            ]}
            onPress={() => {
              this.setState({ index: 2 }, () =>
                this.setState({
                  PlannerInfo: _.sortBy(
                    this.props.PlannerInfo,
                    p => p.smartRecommedPoint * -1
                  )
                })
              );
            }}
          >
            <Text
              style={{ color: this.state.index == 2 ? "#F5DA81" : "#BDBDBD" }}
            >
              똑똑추천
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.basicCategoryButton,
              {
                borderBottomColor: this.state.index == 3 ? "#F5DA81" : "white"
              }
            ]}
            onPress={() => {
              this.setState({ index: 3 }, () => {
                this.setState({
                  PlannerInfo: _.sortBy(
                    this.props.PlannerInfo,
                    p => p.clientNum * -1
                  )
                });
              });
            }}
          >
            <Text
              style={{ color: this.state.index == 3 ? "#F5DA81" : "#BDBDBD" }}
            >
              성과순
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{ width: "100%" }}>
          <View style={styles.contentsScrollView} />
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
    backgroundColor: "#fff"
  },
  secondContainer: {
    height: 60,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  searchBarContainer: {
    height: 40,
    width: "90%",
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingLeft: 40
  },
  searchIconContainer: {
    fontSize: 20,
    position: "absolute",
    left: 30,
    top: 20
  },
  categoryBox: {
    flexDirection: "row",
    height: 50,
    width: "100%",
    justifyContent: "center"
  },
  basicCategoryButton: {
    height: 50,
    width: "30%",
    borderBottomWidth: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  contentsScrollView: {
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
    PlannerInfo: state.PlannerInfo
  };
};

export default connect(mapStateToProps)(Planner);
