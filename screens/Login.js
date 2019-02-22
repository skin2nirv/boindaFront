import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { KeyboardAvoidingView, ScrollView } from 'react-native'
import TextInputForm from '../components/TextInputForm'
import RoundButton from '../components/RoundButton';

export default class Login extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.rectangle} />
        <Image style={{width: 140, height:70, position:'absolute', top:95}} source={require('../assets/icLogoTop.png')} />
        <Image style={{width: 140, height:70, top:4 }} source={require('../assets/icLogoBottom.png')} />
        <TextInputForm style={[styles.input, {marginTop:52}]} placeholder="username" name="user" />
        <TextInputForm style={[styles.input,{ marginTop:13}]} placeholder="password" name="unlock" secureTextEntry={true} />
        <View >
          <RoundButton title="Log in" onPress={() => this.props.navigation.navigate('Home')} 
            style={[styles.button, {backgroundColor: "#ffe545", marginTop:45}]}
            textStyle={{color:'white', fontSize:15}}/>
          <RoundButton title="Sign Up" onPress={() => this.props.navigation.navigate('Home')} 
            style={[styles.button, {borderWidth:1, borderColor: "#be9c00", marginTop:13 }]}
            textStyle={{color:'#be9c00', fontSize:15}}/>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent:'flex-start',
    alignItems:'center'
  },
  rectangle:{
      width: 375,
      height: 168,
      backgroundColor: '#ffdb00'
  },
  input: {
    width:330,
    height:40, 
    borderRadius:5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:10,
  },
  button:{
    width: 330,
    height: 40,
    borderRadius: 20, 
    justifyContent:'center', 
    alignItems:'center'
  }
});