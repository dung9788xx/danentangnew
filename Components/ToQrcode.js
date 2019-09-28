import React, { Component } from 'react'
import {TextInput, TouchableOpacity, View, Image, ImageBackground, Text, StyleSheet } from 'react-native'
import ActionButton, { ActionButtonItem } from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import QRCode from 'react-native-qrcode';
import { Linking } from 'react-native'
export default class ToQrcode extends Component {
    constructor() {
        super()
        this.state = {
          phonenumber: "",
          phonenumber1: "",
        };
    }
    componentDidMount(){
      const { navigation } = this.props;  
      this.setState({
          phonenumber:navigation.getParam('phonenumber', ""),
          phonenumber1:navigation.getParam('phonenumber1', "")
      })

     
  }
  renderqr(){
      if(this.state.phonenumber!=""){
        return(
         <View>
            <Text style={{fontSize:20,fontWeight:'bold',marginBottom:10,alignSelf:'center'}}>
          {this.state.phonenumber}
        </Text>
          <QRCode
          value={`tel:${this.state.phonenumber}`}
          size={250}
          bgColor='purple'
          fgColor='white'/>
         </View>
        )
      }
    }
    renderqr1(){
      if(this.state.phonenumber1!=""){
        return(
       <View>
            <Text style={{fontSize:20,fontWeight:'bold',marginBottom:10,alignSelf:'center'}}>
          {this.state.phonenumber1}
        </Text>
          <QRCode
          value={`tel:${this.state.phonenumber1}`}
          size={250}
          bgColor='purple'
          fgColor='white'/>
       </View>
        )
      }
    }
    render() {
        return (
            <View style={this.styles.container}>
              {this.renderqr()}
              {this.renderqr1()}
            </View>
          );
    }

     styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center'
        },
    
     
    });
    
}
