import React, { Component } from 'react';
import { TextInput, View, Image, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob'
var options = {
    title: 'Chọn ảnh đại diện',
    cancelButtonTitle:"Thoát",
    takePhotoButtonTitle:'Chụp ảnh',
    chooseFromLibraryButtonTitle:'Chọn từ thư viện',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
export default class AddContact extends Component {
    constructor() {
        super()
        this.state = {
            avatarSource: null,
            data: null,
            ten:"",
            sdt1:"",
            sdt2:"",
            email:"",
            tenmessage:'',
            sdt1message:"",
            sdt2message:"",
            emailmessage:"",
            iduser:"",
           
        }
    }

    showImagePicker() {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {

                const source = { uri: response.uri };
                this.setState({
                    avatarSource: source,
                    data: response.data

                }
                )




            }
        });
    }
    upload() {
     
        RNFetchBlob.fetch('POST', 'http://192.168.1.170/React/add.php', {
            Authorization: "Bearer access-token",
            otherHeader: "foo",
            'Content-Type': 'multipart/form-data',
        }, [
            {name:'iduser',data:this.state.iduser},
            {name:'ten',data:this.state.ten},
             {name:'sdt1',data:this.state.sdt1},
            {name:'sdt2',data:this.state.sdt2},
            {name:'email',data:this.state.email},
           
            { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data}
        ]).then((resp) =>resp.json())
        .then((resjson)=>{
         if(resjson=="1"){
             this.props.navigation.push('Home')
         }else{
             alert("Xảy ra lỗi vui lòng thử lại!")
         }
            
              
        })
        .catch((err) => {
            alert(err)
        })
    }
    check(){
        if(this.state.ten==""){
            this.setState({
                tenmessage:"Tên không được bỏ trống!"
            })
        }else{
            this.setState({
                tenmessage:""
            }) 
        }
        if(this.state.sdt1==""&&this.state.sdt2==""){
            this.setState({
                sdt1message:"Số điện thoại không được bỏ trống!"
            }) 
        }else{
                this.setState({
                    sdt1message:""
                }) 
                var phonenumber= /^[0-9]{10,13}$/;
            if(!phonenumber.test(this.state.sdt1)&&this.state.sdt1!=""){
                this.setState({
                    sdt1message:"Số điện thoại không đúng định dạng!"
                }) 
            }else{
                this.setState({
                    sdt1message:""
                }) 
            }
            if(!phonenumber.test(this.state.sdt2)&&this.state.sdt2!=""){
                this.setState({
                    sdt2message:"Số điện thoại không đúng định dạng!"
                }) 
            }else{
                this.setState({
                    sdt2message:""
                }) 
               }
               
        }
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if( !re.test(this.state.email)&&this.state.email!=""){
            this.setState({
                emailmessage:"Email không đúng định dạng!"
            }) 
        }else{
            this.setState({
                emailmessage:""
            }) 
        }
        setTimeout(()=>{ //Tất cac ham chạy cung 1 luc tat ca gia tri ban dau deu bang " " nen can delay de thuc hien kiem tra truoc
 
            if(this.state.tenmessage==""&&this.state.sdt1message==""&&this.state.sdt2message==""
            &&this.state.emailmessage==""&&this.state.ten!=""){
                this.upload()
            }
       
          }, 100);
       
    }
  
    render() {
        return (
            <View style={style.body1}>
                <View style={style.top}>
                    <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
                    <Image style={[style.image, { alignSelf: 'center' }]} source={require("../img/cancel.png")} 
                    />
                    </TouchableOpacity>
                    <View style={{ flex: 50, flexDirection: 'column', alignSelf: 'center' }}>
                        <Text style={{ fontSize: 18, alignSelf: 'center', fontWeight: 'bold' }}>Thêm liên hệ</Text>
                    </View>
                    <TouchableOpacity onPress={this.check.bind(this)}>
                        <Image style={[style.image, { alignSelf: 'center' }]} source={require("../img/check.png")} />
                    </TouchableOpacity>
                </View>
                <View style={style.avatar}>
                    <TouchableOpacity
                        onPress={
                            this.showImagePicker.bind(this)
                        }>
                        <Image
                            style={{ alignSelf: 'center', width: 100, height: 100 }} source={require("../img/user.png")} />
                    </TouchableOpacity>
                </View>
                <View style={style.contain}>
                    <TextInput
                        onChangeText={
                            (text) => {
                                this.setState(
                                    (pret) => {
                                        return {
                                            ten: text
                                        }
                                    }
                                )

                            }
                        } style={style.textinput} placeholder="Tên"></TextInput>
                       <Text style={style.textwarning}>{this.state.tenmessage}</Text> 
                    <TextInput
                    keyboardType='numeric'
                        onChangeText={
                            (text) => {
                                this.setState(
                                    (pret) => {
                                        return {
                                            sdt1: text
                                        }
                                    }
                                )

                            }
                        } style={style.textinput} placeholder="Số điện thoại 1"></TextInput>
                         <Text style={style.textwarning}>{this.state.sdt1message}</Text> 
                    <TextInput
                    keyboardType='numeric'
                        onChangeText={
                            (text) => {
                                this.setState(
                                    (pret) => {
                                        return {
                                            sdt2: text
                                        }
                                    }
                                )

                            }
                        } style={style.textinput} placeholder="Số điện thoại 2"></TextInput>
                         <Text style={style.textwarning}>{this.state.sdt2message}</Text> 
                    <TextInput

                        onChangeText={
                            (text) => {
                                this.setState(
                                    (pret) => {
                                        return {
                                            email: text
                                        }
                                    }
                                )

                            }
                        } style={style.textinput} placeholder="Email"></TextInput>
                         <Text style={style.textwarning}>{this.state.emailmessage}</Text> 
                </View>
            
                <Image
                    style={{ alignSelf: 'center', width: 100, height: 100 }} source={this.state.avatarSource} />
            </View>
        );
    }
    componentDidMount(){
        const { navigation } = this.props;  
        const id = navigation.getParam('iduser', 'NO-User');  
        this.setState({
            iduser:id
        })
       
    }
}
const style = StyleSheet.create({
    body1: {
        flex: 1,


    },
    top: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        flex: 10

    },
    avatar: {

        flexDirection: 'row',
        alignSelf: 'center',

        flex: 15
    },
    contain: {
            paddingTop:30,
        flex: 75
    },
    image: {
        width: 50,
        height: 50
    },
    textinput: {
        borderWidth: 1,
        borderTopColor: 'white',
        borderRightColor: 'white',
        borderLeftColor: 'white',
        borderBottomColor: '#D5D8DC',
        marginLeft: 20,
        marginRight: 20,
        fontSize: 18,
  

    },
    textwarning:{
        marginLeft:20,
        marginTop:5,
        color:'red'
    }

})