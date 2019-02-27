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
  import { withTheme } from "react-native-elements";
  
  class RecomandInsurance extends React.Component {
    state = {
      index: 1
    };
  
    static navigationOptions = ({ navigation }) => {
      return {
        title: "내 설계사",
        headerStyle: { backgroundColor: "#ffdb00" },
        headerTitleStyle: { fontSize: 15, color: "white", fontWeight: "600", fontStyle: "normal", letterSpacing: 0, color: "#535353" }
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
         
          <ScrollView style={{ width: "100%" }}>
            <View style={styles.contentsScrollView} />
            <FlatList
              keyExtractor={(index, item) => index + item}
              style={{ width: "100%" }}
              contentContainerStyle={{ alignItems: "center" }}
              data={this.state.PlannerInfo}
              ItemSeparatorComponent={ () => (
                <View style={{
                  height: 5,
                  // marginLeft:20, 
                  backgroundColor:"#F2F2F2"
                }} />
              )}
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
      paddingBottom:10
    },
    secondContainer: {
      height: 60,
      backgroundColor: "#F2F2F2",
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
    },
    searchBarContainer: {
      height: 40,
      width: "90%",
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      paddingLeft: 40,
      borderRadius : 5
    },
    searchIconContainer: {
      fontSize: 20,
      position: "absolute",
      left: 30,
      top: 20
    },
    categoryBox: {
      flexDirection: "row",
      backgroundColor: "#F2F2F2",
      height: 40,
      width: "100%",
      justifyContent: "flex-start"
    },
    basicCategoryButton: {
      marginLeft: 10,
      height: 30,
      width: 60,
      justifyContent: "center",
      alignItems: "center",
      borderRadius:8
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
      PlannerInfo: state.PlannerInfo.slice(0, 2)
    };
  };
  
  export default connect(mapStateToProps)(RecomandInsurance);
  