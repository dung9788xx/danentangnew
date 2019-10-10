import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text, View,
} from 'react-native';
export default class Aboutus extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <View style={style.body}>
                <Image style={{ width: 300, height: 150, alignSelf: 'center', marginBottom: 20 }} source={require('../img/logo.png')}>
                </Image>
                <Text style={{textAlign:'center',alignSelf:'center',color:'white'}}>
                    Ứng dụng danh bạ online được thiết kế bởi TRƯƠNG VĂN DŨNG
                    sinh viên lớp CNTT_K14C trường Đại học Công nghệ thông tin và truyền thông
        </Text>
            </View>
        );
    }
    style = StyleSheet.create({

        body: {
            backgroundColor: '#56beff',
            flex: 1,
            justifyContent: 'center'
        },


    })

}
