import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import MainScreen from './screens/MainScreen';
import DetailScreen from './screens/DetailScreen';
import WriteScreen from './screens/WriteScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons'

const BaseNavi = createBottomTabNavigator({
  MainScreen :{
    screen: MainScreen
  },
  DetailScreen: {
    screen: DetailScreen,  
},
  WriteScreen: {
    screen:WriteScreen,
}
},
{
  tabBarOptions:{
    showLabel:false
  }
})
const BaseNavi2 = createStackNavigator(
  {
    Write : WriteScreen,
    Tab: BaseNavi,
    Detail : DetailScreen,
    Main : MainScreen,
  },
  {
    initialRouteName:'Tab',
    headerMode : 'none'
  }
)
const MyNavi = createAppContainer(BaseNavi2)
export default function App() {
  return (
    <View style={styles.container}>
      <MyNavi/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});