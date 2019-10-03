import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
import {Alert,ActivityIndicator,
  Button, Image,
  StyleSheet, ImageBackground,
  TextInput,
  Text, View, TouchableHighlight, TouchableOpacity
} from 'react-native';
import ServerConfig from './ServerConfig'
import { StackNavigator } from 'react-navigation';
import NetInfo from "@react-native-community/netinfo";
export class Login extends Component {
  constructor() {
    super()
    server=new ServerConfig()
    this.checknetwork()
    this.state = {
      iduser:null,
      username: "admin",
      password: "1234",
      message: "",
      isprocessing:false,
      networkstate:false    }
   
  }
  setisprocessing(){
    this.setState(
      ()=>{
        return{
          isprocessing:!this.state.isprocessing
        }
      }
    )
  }
  checknetwork(){
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        this.setState(
          ()=>{
            return{
              networkstate:true
            }
          }
        )
     
      } else {
        this.setState(
          ()=>{
            return{
              networkstate:false,
              
            }
          }
        )
 
      }

    });
  }
  showprogress(){
      if(this.state.isprocessing){
    return(
      <ActivityIndicator size="large" color="#24a0ed" />
    );}
  }
 check = () => {
 this.checknetwork();
   if(this.state.networkstate){
    this.setState(
      ()=>{
        return{
          isprocessing:true
        }
      }
    )
    fetch(server.getServerIp()+'/React/login.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,

      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.toString().charAt(0) == "1") {
        

          this.setState(
            ()=>{
              var a=responseJson.toString()+""
              return{
                message:"",
                iduser:a.substring(1,a.length)
                
              }
            }
          )
          this.chuyen();
        } else this.setState(
          () => {
            return {
              message: "Vui lòng kiểm tra lại thông tin !"
            }
          }
        );
          this.setisprocessing();

      })
      .catch((error) => {
        alert(error)
      });



   }else{
      this.setState(
        ()=>{
          return{
            message:"Kiểm tra lại kết nối !",
            isprocessing:false
          }
        }
      )
   }
  }
  chuyen(){

  
    this.props.navigation.navigate('Home',{
      iduser:this.state.iduser
    })
   
  }
  
  render() {
  
    return (
      <View style={style.body}>
          <Image style={{width:300,height:150,alignSelf:'center',marginBottom:20}} source={require('../img/logo.png')}>
          </Image>
        <TextInput
          ref="username"
          placeholder="Tên tài khoản"
          style={style.input}
          onChangeText={
            (text) => {
              this.setState(
                (pret) => {
                  return {
                    username: text
                  }
                }
              )
            }
          }
          value={this.state.username}
        />
        <TextInput
          placeholder="Mật khẩu"
          secureTextEntry={true}
          style={style.input}
          onChangeText={
            (text) => {
              if (text.charAt(text.length - 1) != " ") {
                this.setState(

                  (pret) => {
                    return {
                      password: text
                    }
                  }
                )
              }
            }
          }
          textContentType='password'
          value={this.state.password}
        />
        <TouchableHighlight style={[this.style.button, { marginTop: 15 }]}
          onPress={
            this.check.bind(this)
          }>
          <Text style={{ color: 'white', alignSelf: 'center', fontSize: 18 }}>Đăng nhập</Text>
        </TouchableHighlight>
        <Text style={{ color: 'crimson', alignSelf: 'center', fontSize: 18, marginTop: 12 }}>
          {this.state.message}
        </Text>
          {this.showprogress()}
        <TouchableOpacity  style={{width:200,height:70,alignSelf:'center'}}
          onPress={
            () => this.props.navigation.navigate('RegisterScre')
          }>
          <Text style={{ textDecorationLine: 'underline', alignSelf: 'center', fontSize: 18, marginTop: 30, color: 'white', fontSize: 20 }}>
            Đăng ký
               </Text>
        </TouchableOpacity>
      </View>
    );
  }
  style = StyleSheet.create({

    body: {
     backgroundColor: '#56beff',
      flex: 1,
      justifyContent: 'center'
    },
    input: {
      paddingLeft: 20,
      borderRadius: 5,
      marginTop: 12,
      height: 45,
      marginLeft: 30,
      marginRight: 30,
      backgroundColor: 'white'
    },
    button: {
      backgroundColor:'#0275d8',
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: 12,
      borderRadius:5,
      height: 45,
      width: 300,
     
    },
    header: {
      alignSelf: 'center',
      fontSize: 25,
      color: 'white',
      marginBottom: 20
    },
    img: {
  
      borderColor: 'black',
      borderWidth: 1,
  
      width: 60,
      height: 20,
      backgroundColor: 'black',
      borderRadius: 5
    }
  
  })
  
}
