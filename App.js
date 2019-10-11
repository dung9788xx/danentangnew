
import React, {Component} from 'react';
import  {Login} from './Components/LoginForm';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './Components/Home'
import TempScreen from './Components/TempScreen'
import AddContact from './Components/AddContact'
import RegisterScre from './Components/Register'
import ContactDetail from './Components/ContactDetail'
import ToQrcode from './Components/ToQrcode'
import EditContact from './Components/EditContact'
import Aboutus from './Components/Aboutus.js'
import {AsyncStorage} from 'react-native'
import {ToastAndroid,Alert,BackHandler, BackAndroid
} from 'react-native'

const AppNavigator = createStackNavigator({
  TempScreen,TempScreen,
  Login:Login,
  ContactDetail:ContactDetail,
  ToQrcode:ToQrcode,
  EditContact:EditContact,
  AddContact:AddContact,
  Home: Home,
  EditContact:EditContact,
  RegisterScre :RegisterScre,
  Aboutus:Aboutus,
  
},{defaultNavigationOptions: {
  header:null,
},},{
  initialRouteName: 'Login',
});
const AppContainer = createAppContainer(AppNavigator);
export default class App extends Component{
  constructor(){
    super()
    this.state={
      exit:0,
      exit1:0,
      currentScreen:"Login"
    }
  
  }
  chuyen(){
    try{
      this.props.navigation.navigate('Home', {
        iduser: value1
      })
    }catch(LOL){
      alert(LOL)
    }
  }
  start(){
    AsyncStorage.getItem('rememberme').then(
      (value) => {
       
         if(value=="1"){

          AsyncStorage.getItem('iduser').then(
            (value1) => {
              alert(value1)
             this.chuyen()
           
            }
        );
         }
        
      }
  );
  }

  // static defaultNavigationOptions= {
  //   title: 'Welcome',
  // };
  render(){
   
    return(
      
      <AppContainer onNavigationStateChange={(prevState, currentState) => {
      
       this.setState(
         
         ()=>{
           return{
            currentScreen: currentState.routes[currentState.index].routeName
           }
         }
       )
      
      }}></AppContainer>

      
    );
  
    
  }
  componentDidMount(){
    this.start.bind(this);
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }
  handleBackPress = () => {
   if(this.state.currentScreen=='Login'){ 
   if(this.state.exit<1){
    ToastAndroid.show('Ấn lại để thoát!', ToastAndroid.LONG);
     this.setState(
       ()=>{
         return{
           exit:this.state.exit+1
         }
       }
     )
     return true;
   }
   else
 return false // works best when the goBack is async
  }else{
    this.setState(
      ()=>{
        return{
          exit:0
        }
      }
    )
  }
  if(this.state.currentScreen=='Home'){ 
    if(this.state.exit1<1){
     ToastAndroid.show('Ấn lại để thoát!', ToastAndroid.LONG);
      this.setState(
        ()=>{
          return{
            exit1:this.state.exit1+1
          }
        }
      )
      return true;
    }
    else
    BackHandler.exitApp(); // works best when the goBack is async
   }else{
    this.setState(
      ()=>{
        return{
          exit1:0
        }
      }
    )
   }
    return false
   }
  
  
  
  
}



