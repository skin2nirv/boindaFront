import React from "react";
import { StyleSheet, Text, View, FlatList , TextInput, TouchableOpacity} from "react-native";
import { connect } from "react-redux";
import HospitalFlatList from "../components/HospitalFlatList";
import Ionicons from "react-native-vector-icons/Ionicons";

class Hospital extends React.Component {
    state = {
        index : 1
    }
    

    static navigationOptions = ({ navigation }) => {
        return {
          title: "병력조회",
          headerStyle: { backgroundColor: "#ffdb00" },
          headerTitleStyle: { fontSize: 15, color: "white", fontWeight: "600", fontStyle: "normal", letterSpacing: 0, color: "#535353" }
        };
      };
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.secondContainer}>
          <TextInput
            style={styles.searchBarContainer}
            placeholder="검색"
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
              { backgroundColor: this.state.index == 1 ? "#ffdb00" : "white" }
            ]}
           
          >
            <Text
              style={{ fontSize: 12, color: this.state.index == 1 ? "white" : "#BDBDBD" }}
            >
              날짜순
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.basicCategoryButton,
              {
                backgroundColor: this.state.index == 2 ? "#ffdb00" : "white"
              }
            ]}
           
          >
            <Text
              style={{fontSize: 12,color: this.state.index == 2 ? "white" : "#BDBDBD"  }}
            >
              병력순
            </Text>
          </TouchableOpacity>

         
        </View>
                <FlatList
          keyExtractor={(index, item) => index + item}
          style={{ width: "100%" }}
          ItemSeparatorComponent={() => (
            <View style={styles.ItemSeparatorView} />
          )}
          data={this.props.Hospital}
          renderItem={({ item }) => (
            <HospitalFlatList
              uri={item.uri}
              username={item.username}
              comment={item.comment}
              start={item.start}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
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
      Hospital : state.Hospital,

    };
  };
  
  export default connect(mapStateToProps)(Hospital);