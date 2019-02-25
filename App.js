import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import Planner from "./screens/Planner";
import Home from "./screens/Home";
import Myinfo from "./screens/Myinfo";
import HomeDetail from "./screens/HomeDetail";
import MyWeb from "./screens/MyWeb";
import Login from "./screens/Login";
import CoinInfo from "./screens/CoinInfo";
import InsuranceStockOption from "./screens/InsuranceStockOption";
import RegistrationStock from "./screens/RegistrationStock";
import InsuranceDetail from "./screens/InsuranceDetail";
import InsurancePlan from "./screens/InsurancePlan";
import RecomandInsurance from "./screens/RecomandInsurance";
import PrivateData from "./screens/PrivateData";
import PersonalInformationUsageHistory from "./screens/PersonalInformationUsageHistory";
import LeaveServce from "./screens/LeaveServce";
import MoreScreenOfClaim from "./screens/MoreScreenOfClaim";
import MoreScreenOfMyInsurance from "./screens/MoreScreenOfMyInsurance";
import SearchPlanner from "./screens/SearchPlanner";
import InsurancePlannerDetail from "./screens/InsurancePlannerDetail";
import InsuranceChoiceScreen from "./screens/InsuranceChoiceScreen";
import ClaimForInsurance from "./screens/ClaimForInsurance";
import InsurancePlannerDetailBackHome from "./screens/InsurancePlannerDetailBackHome";
import Test from "./screens/Test";
import Hospital from "./screens/Hospital";

let store = createStore(reducer);

const Settings = createStackNavigator({
  Settings: {
      screen: Test// Login으로 바꿀 것
  }
})

const homeStack = createStackNavigator({
  
  Home: {screen: Home}, // Home 으로 바꿀 것
  Login: Login,
  Hospital: Hospital,
  Detail: HomeDetail,
  ClaimForInsurance: ClaimForInsurance,
  Planner: Planner,
  MyWeb: MyWeb,
  InsurancePlan: InsurancePlan,
  RecomandInsurance: RecomandInsurance,
  InsurancePlannerDetailBackHome: InsurancePlannerDetailBackHome
},

);

const MyInfoStack = createStackNavigator({
  Myinfo: Myinfo,
  InsuranceStockOption: InsuranceStockOption,
  RegistrationStock: RegistrationStock,
  InsuranceDetail: InsuranceDetail,
  PrivateData: PrivateData,
  PersonalInformationUsageHistory: PersonalInformationUsageHistory,
  LeaveServce: LeaveServce,
  MoreScreenOfClaim: MoreScreenOfClaim,
  MoreScreenOfMyInsurance: MoreScreenOfMyInsurance
});

const CoinInfoStack = createStackNavigator({
  CoinInfo: CoinInfo,
  RecomandInsurance: RecomandInsurance
});

const ClaimForInsuranceStack = createStackNavigator({
  ClaimForInsurance: ClaimForInsurance,
  InsuranceChoiceScreen: InsuranceChoiceScreen // 이화면 모달로 처리하기
});

const PlannerStack = createStackNavigator({
  Planner: Planner,
  SearchPlanner: SearchPlanner,
  InsurancePlannerDetail: InsurancePlannerDetail
});
const TabNavigator = createBottomTabNavigator(
  {
    홈: homeStack,
    청구: ClaimForInsuranceStack,
    설계사: PlannerStack,
    내정보: MyInfoStack
  },
  {
    defaultNavigationOptions: ({ navigation, navigationOptions }) => ({
      tabBarIcon: ({ horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "홈") {
          iconName = "ios-home";
        } else if (routeName === "분석") {
          return (
            <MaterialCommunityIcons
              name="google-analytics"
              size={horizontal ? 20 : 25}
              color={tintColor}
            />
          );
        } else if (routeName === "설계사") {
          return(
          <Feather 
           name="briefcase"
           size={horizontal ? 20 : 25}
           color={tintColor}
           />
          );
        } else if (routeName === "내정보") {
          return (
            <Feather
              name="user"
              size={horizontal ? 20 : 25}
              color={tintColor}
            />
          );
        } else if (routeName === "청구") {
          return (
            <MaterialCommunityIcons
              name="file-document-box-outline"
              size={horizontal ? 20 : 25}
              color={tintColor}
            />
          );
        }
        return (
          <Ionicons
            name={iconName}
            size={horizontal ? 20 : 25}
            color={tintColor}
          />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: "#F7D358",
      inactiveTintColor: "gray"
    }
  }
);

const RootStack = createStackNavigator(
  {
    Setting:{
      screen : Login
    },
    Main: {
      screen: TabNavigator
    },
    MyModal: {
      screen: CoinInfoStack
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(RootStack);

export default function() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
