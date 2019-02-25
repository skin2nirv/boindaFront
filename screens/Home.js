import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,

} from "react-native";
import { connect } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import _ from "lodash";
import HomeRoundButton from "../components/HomeRoundButton";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HomePlannerFlatList from "../components/HomePlannerFlatList";
import { NavigationEvents } from 'react-navigation';

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    
    return {
      title: "BOINDA",
      header : null,
    };
  };

  state = {
    query: "보험시장",
    coin: 0,
    coinSet : 0,

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

  fetchHyperledgerCoinData() {
    return fetch(
      `http://${this.props.hyperServer}:8080/api/query/queryAllUserCoins`
    )
      .then(response => response.json())
      .catch(error => {
        console.error(error);
      });
  }

  fetchHyperledgerInsuranceDatass() {
    return fetch(
      `http://${this.props.hyperServer}:8080/api/queryss/queryAllContractedInsurance`
    )
      .then(response => response.json())
      .catch(error => {
        console.error(error);
      });
  }

    fetchHyperledgerInsuranceDatass() {
    return fetch(
      `http://${this.props.hyperServer}:8080/api/queryss/queryAllContractedInsurance`
    )
      .then(response => response.json())
      .catch(error => {
        console.error(error);
      });
  }

  fetchHyperledgerInsuranceDatamr() {
    return fetch(
      `http://${this.props.hyperServer}:8080/api/querymr/queryAllContractedInsurance`
    )
      .then(response => response.json())
      .catch(error => {
        console.error(error);
      });
  }
  fetchHyperledgerInsuranceDatakb() {
    return fetch(
      `http://${this.props.hyperServer}:8080/api/querykb/queryAllContractedInsurance`
    )
      .then(response => response.json())
      .catch(error => {
        console.error(error);
      });
  }

  fetchHyperledgerRequestForISMss() {
    return fetch(
      `http://${this.props.hyperServer}:8080/api/queryss/queryAllClaimInsurance`
    )
      .then(response => response.json())
      .catch(error => {
        console.error(error);
      });
  }

  fetchHyperledgerRequestForISMkb() {
    return fetch(
      `http://${this.props.hyperServer}:8080/api/querykb/queryAllClaimInsurance`
    )
      .then(response => response.json())
      .catch(error => {
        console.error(error);
      });
  }
  fetchHyperledgerRequestForISMmr() {
    return fetch(
      `http://${this.props.hyperServer}:8080/api/querymr/queryAllClaimInsurance`
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
    await this.fetchHyperledgerInsuranceDatass().then(items => {
      this.props.dispatch({
        type: "ADD_UserInsuranceInfo",
        UserInsuranceInfo: JSON.parse(items.response),
      })
    }  
  )
  await this.fetchHyperledgerInsuranceDatamr().then(items => {
    this.props.dispatch({
      type: "ADD_UserInsuranceInfo",
      UserInsuranceInfo: JSON.parse(items.response),
    })
  }  
)
await this.fetchHyperledgerInsuranceDatakb().then(items => {
  this.props.dispatch({
    type: "ADD_UserInsuranceInfo",
    UserInsuranceInfo: JSON.parse(items.response),
  })
}  
)
    await this.fetchHyperledgerRequestForISMss().then(items => {
    this.props.dispatch({
      type: "ADD_RequestForISM",
      RequestForISM: JSON.parse(items.response),
    })
  }  
)
    await this.fetchHyperledgerRequestForISMkb().then(items => {
      this.props.dispatch({
        type: "ADD_RequestForISM",
        RequestForISM: JSON.parse(items.response),
      })
    }  
    )
    await this.fetchHyperledgerRequestForISMmr().then(items => {
      this.props.dispatch({
        type: "ADD_RequestForISM",
        RequestForISM: JSON.parse(items.response),
      })
    }  
    )

    await this.fetchHyperledgerCoinData().then(items => {
      this.setState({
        coin : JSON.parse(items.response),
      })      
    

   
    }

    )

    await this.setState({
      coinSet : this.state.coin.map((item => item.Record)),
    })    

    await this.setState({
      user1Coin : this.state.coinSet[0].coin
    })    
    console.log(this.state.user1Coin)

    await this.fetchNews().then(items =>
      this.setState({
        NewsItems: items
      })
    );
    
    await this.setState({
      items: this.props.PlannerInfo,
      index: 1,
      News: this.props.News,
      RequestForISM : this.props.RequestForISM,
      coin : this.props.coin
    });

      
  }

  render() {
    return (
  <View style={{paddingBottom:10, flex:1}}>
  <NavigationEvents
          onWillFocus={() => {
            this.setState({
              coin : this.props.coin
            })
            
        
          }} />

        <View style={styles.twoButtonView}>
        <Image style={{ position:'absolute', top:25, left:157 ,height:70, width:70}} source={require("../assets/logo.png")}/>
        {/* <Text style={{ color:"#535353", fontSize: 15, position : "absolute", top: 45, left: 161, flexDirection: "column",  alignItems: "center", paddingRight: 20 }}>
        BOINDA
        </Text> */}
        <TouchableOpacity
          style={styles.login}
          onPress={() => this.props.navigation.navigate("Settings")}
        >
          <AntDesign name="login" style={{ color: "white", size: 10 }} />
          <Text style={{ fontSize: 10, color: "white" }}>로그아웃</Text>
        </TouchableOpacity>
        <View style={{flexDirection :'row'}}>
        <View style ={{paddingTop: 40, justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize: 13, fontStyle: "normal", paddingBottom:10, paddingTop:30 }}>나의 월 보험료</Text>
          <Text style={{fontSize: 22, fontStyle: "normal", color:"#3a3a3a" }}>87,000 원</Text>
        </View>
        <View style ={{marginLeft : 85,paddingTop: 40, justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize: 13, fontStyle: "normal", paddingBottom:10, paddingTop:30 }}>나의 보유 코인</Text>
          <Text style={{fontSize: 22, fontStyle: "normal", color:"#3a3a3a" }}>{this.props.coin}BoC</Text>
        </View>
        </View>

        </View>
      <ScrollView style={styles.container}>

        <View style={styles.threeButtonBox}>
          <TouchableOpacity
            style={styles.threeButtonStyle}
            onPress={() => {
              this.props.navigation.navigate("RecomandInsurance");
            }}
            
          >
            <AntDesign
              name="heart"
              style={[styles.threeButtonIcon, { paddingBottom: 6 }]}
            />
            <Text style={{ fontSize: 11, color: "#A4A4A4" }}>내 설계사</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.threeButtonStyle}
            onPress={() => this.props.navigation.navigate("InsurancePlan")}
          >
         
            <FontAwesome name="list-alt" style={[styles.threeButtonIcon, { paddingBottom: 8 }]} />
            <Text style={{ fontSize: 11, color: "#A4A4A4" }}>설계일정</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={styles.threeButtonStyle}
          onPress={() => this.props.navigation.navigate("Hospital")}>
            <FontAwesome name="search" style={[styles.threeButtonIcon, { paddingBottom: 10 }]} />
            <Text style={{ fontSize: 11, color: "#A4A4A4" }}>병력조회</Text>
          </TouchableOpacity>
        </View>
        <View style={{  height:30, flexDirection:'row'}}>
        <View style={{width:"50%"}}>
            <Text style={{position:'absolute', top: 15 ,left:24}}>인기설계사</Text>
          </View>
          <View style={{ width:"50%"}}>
            <Text style={{position:'absolute', top:15, right:24}}>></Text>
          </View>
        </View>

        <View style={styles.horizontalFlatList}>


          <FlatList
            style={{ height: 200, width: "100%" }}
            data={this.props.PlannerInfo}
            horizontal={true}
            renderItem={({ item }) => (
              <HomePlannerFlatList
                onPress={() => {
                  this.props.navigation.navigate("InsurancePlannerDetailBackHome"),
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    position : "absolute",
    top: 45,
    right: 15,
    flexDirection: "column",
    alignItems: "center",
    // paddingBottom: 50

  },
  container: {
    // flex: 1,
    backgroundColor: "#fff"
  },

  twoButtonView: {
    // borderColor: "#ffdb00",
    backgroundColor: "#ffdb00",
    // borderWidth: 1,
    justifyContent: "space-around",
    alignItems: "center",
    height: 180,
    width: "100%",
    flexDirection: "row"
  },
  threeButtonBox: {
    height: 85,
    width: "100%",
    backgroundColor: "#F2F2F2",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center"
  },
  threeButtonStyle: {
    backgroundColor: "white",
    height: 75,
    width: 120,
    borderColor: "#F2F2F2",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  threeButtonIcon: {
    textAlign: "center",
    color: "#ffdb00",
    fontSize: 20,
    paddingBottom: 2
  },
  horizontalFlatList: {
    height: 200,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "flex-start",

  },
  horizontalFlatListText: {
    paddingLeft: 24,
    fontSize: 13,
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
    coin : state.coin,
    Coininfo : state.CoinInfo,
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

export default connect(mapStateToProps)(Home);
