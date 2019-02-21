import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import _ from "lodash";
import HomeRoundButton from "../components/HomeRoundButton";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HomePlannerFlatList from "../components/HomePlannerFlatList";

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "KALON",
      headerStyle: { backgroundColor: "#F5DA81" }, // 노란색
      headerTitleStyle: { fontSize: 22, color: "white" },
      headerRight: (
        <TouchableOpacity
          style={styles.login}
          onPress={() => navigation.navigate("Login")}
        >
          <AntDesign name="login" style={{ color: "white", size: 10 }} />
          <Text style={{ fontSize: 10, color: "white" }}>로그인</Text>
        </TouchableOpacity>
      )
    };
  };

  state = {
    query: "보험시장"
  };

  fetchNews(page = 1) {
    const display = 10;
    const start = display * (page - 1) + 1;
    var query = this.state.query;

    return fetch(
      `https://openapi.naver.com/v1/search/news.json?query=${query}&display=${display}&start=${start}`,
      {
        headers: {
          "X-Naver-Client-Id": "vTiJhVKTgkFtmAOe1aRw",
          "X-Naver-Client-Secret": "KNnOp1CgQd"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        return responseJson.items;
      })
      .catch(error => {
        console.error(error);
      });
  }


  fetchHyperledgerData() {
    return fetch(
      `http://${this.props.hyperServer}:8080/api/query/queryAllPlanners`
    )
      .then(response => response.json())
      .catch(error => {
        console.error(error);
      });
  }

  fetchHyperledgerInsuranceData() {
    return fetch(
      `http://${this.props.hyperServer}:8080/api/query/queryAllContractedInsurance`
    )
      .then(response => response.json())
      .catch(error => {
        console.error(error);
      });
  }

  fetchHyperledgerRequestForISM() {
    return fetch(
      `http://${this.props.hyperServer}:8080/api/query/queryAllClaimInsurance`
    )
      .then(response => response.json())
      .catch(error => {
        console.error(error);
      });
  }

  // componentDidMount(){
  //   this.fetchHyperledgerData().then(items =>      
  //     this.props.dispatch({
  //       type: "ADD_PlannerInfo",
  //       PlannerInfo: items        
  //     })
  
  
  //     })
  //   );
  //   this.setState({
  //     items: this.props.PlannerInfo,
  //     index: 1,
  //     News: this.props.News
  //   });

  //   console.log(this.props.PlannerInfo)
  // }
  
  componentDidMount = async () => {
      await this.fetchHyperledgerData().then(items => {
        this.props.dispatch({
          type: "ADD_PlannerInfo",
          PlannerInfo: JSON.parse(items.response),
        })
      }  
    )
    await this.fetchHyperledgerInsuranceData().then(items => {
      this.props.dispatch({
        type: "ADD_UserInsuranceInfo",
        UserInsuranceInfo: JSON.parse(items.response),
      })
    }  
  )
    await this.fetchHyperledgerRequestForISM().then(items => {
    this.props.dispatch({
      type: "ADD_RequestForISM",
      RequestForISM: JSON.parse(items.response),
    })
  }  
)
    await this.fetchNews().then(items =>
      this.setState({
        NewsItems: items
      })
    );
    await this.setState({
      items: this.props.PlannerInfo,
      index: 1,
      News: this.props.News
    });

    // console.log(this.props.PlannerInfo)
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.twoButtonView}>
          <HomeRoundButton
            onPressTopButton={() => this.props.navigation.navigate("내정보")}
            name="md-search"
            text="내정보"
          />
          <HomeRoundButton
            onPressTopButton={() => this.props.navigation.navigate("CoinInfo")}
            name="logo-bitcoin"
            text="코인"
          />
        </View>
        <View style={styles.threeButtonBox}>
          <TouchableOpacity
            style={styles.threeButtonStyle}
            onPress={() => {
              this.props.navigation.navigate("RecomandInsurance");
            }}
            
          >
            <AntDesign
              name="inbox"
              style={[styles.threeButtonIcon, { paddingBottom: 2 }]}
            />
            <Text style={{ fontSize: 12, color: "#A4A4A4" }}>추천상품</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.threeButtonStyle}
            onPress={() => this.props.navigation.navigate("InsurancePlan")}
          >
         
            <FontAwesome name="list-alt" style={styles.threeButtonIcon} />
            <Text style={{ fontSize: 12, color: "#A4A4A4" }}>설계일정</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.threeButtonStyle}>
            <FontAwesome name="stethoscope" style={styles.threeButtonIcon} />
            <Text style={{ fontSize: 12, color: "#A4A4A4" }}>병력조회</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalFlatList}>
          <Text style={styles.horizontalFlatListText}>인기설계사></Text>
          <FlatList
            style={{ height: 250, width: "100%" }}
            data={this.props.PlannerInfo}
            horizontal={true}
            renderItem={({ item }) => (
              <HomePlannerFlatList
                onPress={() => {
                  this.props.navigation.navigate("InsurancePlannerDetail"),
                    this.props.dispatch({
                      type: "ADD_PLANNER_DETAIL",
                      item: item
                    });
                }}
                uri={item.uri}
                team={item.team}
                name={item.name}
                averageEstimation={item.averageEstimation}
              />

              // ruducer 형태.
              // name: "권태희",
              // startDay: "18.09.04",
              // clientNum: 80,
              // team: "kalon",
              // averageEstimation: 4,
              // url: "http://img.hankyung.com/photo/201808/01.17511742.1.jpg"
            )}
          />
        </View>
        <TouchableOpacity
          style={styles.advertisementContent}
          onPress={() => {
            this.props.navigation.navigate("MyWeb", {
              itemUri: "https://www.kbli.co.kr/CUCO/CUCO10010M.do"
            });
          }}
        >
          <Image
            source={{
              uri:
                "http://insight.kbinsure.co.kr/wp-content/uploads/2018/02/%EB%B0%B0%EB%84%882.png"
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </TouchableOpacity>
        <View style={{ width: "100%" }}>
          <View style={styles.advertisementBox}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                {
                  borderColor: this.state.index == 1 ? "#F5DA81" : "white"
                }
              ]}
              onPress={() => {
                this.setState(
                  {
                    index: 1,
                    query: "보험시장"
                  },
                  () => {
                    this.fetchNews().then(items =>
                      this.setState({
                        NewsItems: items
                      })
                    );
                  }
                );
              }}
            >
              <Text>새소식</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                {
                  marginLeft: 15,
                  borderColor: this.state.index == 2 ? "#F5DA81" : "white"
                }
              ]}
              onPress={() => {
                this.setState(
                  {
                    index: 2,
                    query: "GA시장"
                  },
                  () => {
                    this.fetchNews().then(items =>
                      this.setState({
                        NewsItems: items
                      })
                    );
                  }
                );
              }}
            >
              <Text>보험 뉴스</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style={{ width: "100%" }}
            data={this.state.NewsItems}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.bottomFlatList}
                onPress={() =>
                  this.props.navigation.navigate("MyWeb", {
                    itemUri: item.link
                  })
                }
              >
                <Text style={{ fontSize: 13 }}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    flexDirection: "column",
    alignItems: "center",
    paddingRight: 20
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  twoButtonView: {
    borderColor: "#D8D8D8",
    borderWidth: 1,
    justifyContent: "space-around",
    alignItems: "center",
    height: 80,
    width: "100%",
    flexDirection: "row"
  },
  threeButtonBox: {
    height: 60,
    width: "100%",
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center"
  },
  threeButtonStyle: {
    backgroundColor: "white",
    height: 55,
    width: 121,
    borderColor: "#F2F2F2",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  threeButtonIcon: {
    textAlign: "center",
    color: "#F7D358",
    fontSize: 20,
    paddingBottom: 5
  },
  horizontalFlatList: {
    height: 250,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  horizontalFlatListText: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 5,
    color: "#585858"
  },
  advertisementBox: {
    height: 50,
    paddingLeft: 5,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#F2F2F2",
    borderWidth: 2
  },
  advertisementContent: {
    height: 100,
    width: "100%",
    borderColor: "#F2F2F2",
    borderWidth: 8,
    backgroundColor: "#F7F8E0",
    flexDirection: "row"
  },
  tabButton: {
    borderWidth: 0.5,
    borderRadius: 25,
    width: 80,
    height: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  bottomFlatList: {
    height: 50,
    borderColor: "#F2F2F2",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 5
  }
});

const mapStateToProps = state => {
  return {
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

export default connect(mapStateToProps)(Home);
