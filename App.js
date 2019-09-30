
import React, {Component} from 'react';
import  {Login} from './Components/LoginForm';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './Components/Home'
import AddContact from './Components/AddContact'
import RegisterScre from './Components/Register'
import ContactDetail from './Components/ContactDetail'
import ToQrcode from './Components/ToQrcode'
import EditContact from './Components/EditContact'
import {ToastAndroid,Alert,BackHandler
} from 'react-native'

const AppNavigator = createStackNavigator({
  Login:Login,
  ContactDetail:ContactDetail,
  ToQrcode:ToQrcode,
  EditContact:EditContact,
  AddContact:AddContact,
  Home: Home,
  RegisterScre :RegisterScre,

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
      currentScreen:"Login"
    }
  }
  static defaultNavigationOptions= {
    title: 'Welcome',
  };
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
  }
  return false
  }
  
}



