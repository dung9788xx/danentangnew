import React, { Component } from "react"
import {
  Alert, ActivityIndicator,
  Button, Image,
  StyleSheet, ImageBackground,
  TextInput,
  Text, View, TouchableHighlight, TouchableOpacity
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import NetInfo from "@react-native-community/netinfo";
export default class RegisterScre extends Component {
  constructor() {
    super()
    this.checknetwork()
    this.state = {
      username: "",
      password: "",
      repassword: "",
      message: "",
      isprocessing: false,
      networkstate: false

    }
  }
  setprocessing(status) {
    this.setState(
      () => {
        return {
          isprocessing: status
        }
      }
    )
  }
  setmessage(message) {
    this.setState(
      () => {
        return {
          message: message
        }
      }
    )
  }
  checknetwork() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        this.setState(
          () => {
            return {
              networkstate: true
            }
          }
        )

      } else {
        this.setState(
          () => {
            return {
              networkstate: false,

            }
          }
        )

      }

    });
  }
  showprogress() {
    if (this.state.isprocessing) {
      return (
        <ActivityIndicator size="large" color="#24a0ed" />
      );
    }
  }
  showwarning() {
    if (this.state.message != "") {
      return (
        <View style={[style.button, { backgroundColor: 'rgba(250, 52, 43,0.66)' }]}>
          <Text style={{ color: 'white', alignSelf: 'center', fontSize: 16 }}>
            {this.state.message}
          </Text>
        </View>
      )
    }
  }
  check() {
    if (this.state.username == "" || this.state.password == "") {
      this.setmessage("Vui lòng nhập đầy đủ thông tin !")
    } else
      if (this.state.repassword != this.state.password) {

        this.setmessage("Hai mật khẩu không trùng khớp !")
      } else {
        this.checknetwork();
        if (this.state.networkstate) {
          this.setState(
            () => {
              return {
                isprocessing: true
              }
            }
          )
          fetch('http://123.123.123.123/React/register.php', {
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
              if (responseJson.toString() == "1") {
                this.setState(
                  () => {
                    return {
                      message: "",

                    }
                  }
                )
                const resetAction = StackActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: 'Login' })],
                });
                this.props.navigation.dispatch(resetAction)
                //   Alert.alert(
                //     '',
                //     'Đăng ký thành công !  ',
                //     [  
                //       {text: 'OK', onPress: () =>  this.props.navigation.push('Login')},
                //     ],
                //     {cancelable: false},
                //   );

              } else
                if (responseJson.toString() == "2") {
                  this.setmessage("Tài khoản đã tồn tại !")

                }
                else this.setmessage("Vui lòng kiểm tra lại thông tin !")
              this.setprocessing(false)

            })
            .catch((error) => {
              console.warn(error);
            });

        } else {
          this.setState(
            () => {
              return {
                message: "Kiểm tra lại kết nối !",
                isprocessing: false
              }
            }
          )
        }
      }
  }
  render() {
    return (
      <View style={style.body}>

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
        <TextInput

          placeholder="Nhập lại mật khẩu"
          secureTextEntry={true}
          style={style.input}
          onChangeText={
            (text) => {
              if (text.charAt(text.length - 1) != " ") {
                this.setState(

                  (pret) => {
                    return {
                      repassword: text
                    }
                  }
                )
              }
            }
          }
          textContentType='password'
          value={this.state.repassword}
        />
        <TouchableHighlight style={[style.button, { marginTop: 15 }]}
          onPress={
            this.check.bind(this)
          }
        >
          <Text style={{ color: 'white', alignSelf: 'center', fontSize: 18 }}>Đăng ký</Text>
        </TouchableHighlight>

        {this.showwarning()}
        {this.showprogress()}




      </View>
    );
  }


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
    backgroundColor: '#0275d8',
    justifyContent: 'center',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 12,
    height: 45,

    width: 300

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
