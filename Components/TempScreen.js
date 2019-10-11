
import React, {Component} from 'react';
import {AsyncStorage, View} from 'react-native'
import {ToastAndroid,Alert,BackHandler, BackAndroid
} from 'react-native'

export default class TempScreen extends Component{
  constructor(){
    super()

    this.start()
  }

  start(){
    AsyncStorage.getItem('rememberme').then(
      (value) => {
       
         if(value=="1"){

          AsyncStorage.getItem('iduser').then(
            (value1) => {
          
              this.props.navigation.navigate('Home', {
                iduser: value1
              })
           
            }
        );
         }else{
            this.props.navigation.navigate('Login')
         }
        
      }
  );
  }

  render(){
   
    return(
      
        <View></View>

      
    );
  
    
  }

  
  
}



