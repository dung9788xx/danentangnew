import React, { Component } from 'react'
import { TouchableOpacity, View, Image, ImageBackground, Text, StyleSheet } from 'react-native'
import ActionButton, { ActionButtonItem } from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { Linking } from 'react-native'
import ServerConfig from './ServerConfig'
export default class ContactDetail extends Component {
    constructor() {
        super()
        server=new ServerConfig()
        this.state = {
            contactitem: [],
            imageurl: require('../img/defaultavatar.jpg')
        }
    }
    rendersdt1() {
        if (this.state.contactitem.sdt1 != "") {
            return (
                <View style={this.style.phoneitem}>
                    <Text onPress={() => Linking.openURL(`tel:${this.state.contactitem.sdt1}`)} style={{ flex: 50, alignSelf: 'center', marginLeft: 30, fontSize: 16 }}>{this.state.contactitem.sdt1}</Text>
                    <TouchableOpacity style={{ marginTop: 8 }} onPress={() => Linking.openURL(`sms:${this.state.contactitem.sdt1}${Platform.OS === "ios" ? "&" : "?"}body=${""}`)}>
                        <Image style={{ flex: 50 }} source={require('../img/message.png')} style={{ height: 30, width: 30, alignSelf: 'flex-end', marginRight: 10 }} />
                    </TouchableOpacity>

                </View>
            )
        }
    }
    rendersdt2() {
        if (this.state.contactitem.sdt2 != "") {
            return (
                <View style={this.style.phoneitem}>
                    <Text onPress={() => Linking.openURL(`tel:${this.state.contactitem.sdt2}`)} style={{ flex: 50, alignSelf: 'center', marginLeft: 30, fontSize: 16 }}>{this.state.contactitem.sdt2}</Text>
                    <TouchableOpacity style={{ marginTop: 8 }} onPress={() => Linking.openURL(`sms:${this.state.contactitem.sdt2}${Platform.OS === "ios" ? "&" : "?"}body=${""}`)}>
                        <Image style={{ flex: 50 }} source={require('../img/message.png')} style={{ height: 30, width: 30, alignSelf: 'flex-end', marginRight: 10 }} />
                    </TouchableOpacity>

                </View>
            )
        }
    }
    renderemail() {
        if (this.state.contactitem.email != "") {
            return (
                <View style={this.style.phoneitem}>
                    <TouchableOpacity onPress={
                        () => Linking.openURL('mailto:' + this.state.contactitem.email)
                    } style={{ flex: 1, flexDirection: 'row' }}>
                        <Text numberOfLines={1} style={{ flex: 50, alignSelf: 'center', marginLeft: 30, fontSize: 16 }} >
                            {this.state.contactitem.email}
                        </Text>
                        <View style={{ flex: 50, flexDirection: 'column' }}>

                            <Icon style={{ fontSize: 20, flexDirection: 'column', alignSelf: 'flex-end', marginTop: 10, marginRight: 20 }} name="md-paper-plane" />
                        </View>
                    </TouchableOpacity>

                </View>
            )
        }
    }
    render() {
        return (
            <View style={this.style.body}>
                <View style={this.style.ct1}>
                    <ImageBackground style={{ flex: 1, flexDirection: 'row', borderBottomStartRadius: 10, borderBottomEndRadius: 10, borderColor: '#F2F4F4', overflow: 'hidden' }} source={this.state.imageurl}>
                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginBottom: 20 }}>

                            <Image
                                style={{ alignSelf: 'center', width: 70, height: 70, marginLeft: 20 }}
                                source={require("../img/user.png")} />
                            <Text style={{ alignSelf: 'center', marginLeft: 10, color: 'white', fontSize: 18 }}>{this.state.contactitem.ten}</Text>
                        </View>

                    </ImageBackground>

                </View>
                <View style={this.style.ct2}>
                    {this.rendersdt1()}
                    {this.rendersdt2()}
                    {this.renderemail()}
                    <View style={this.style.phoneitem}>
                        <TouchableOpacity onPress={
                            () => this.props.navigation.navigate('ToQrcode', { phonenumber: this.state.contactitem.sdt1, phonenumber1: this.state.contactitem.sdt2 })
                        } style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ flex: 50, alignSelf: 'center', marginLeft: 30, fontSize: 16 }} >
                                Mã QR
                          </Text>
                            <View style={{ flex: 50, flexDirection: 'column' }}>

                                <Icon style={{ fontSize: 20, flexDirection: 'column', alignSelf: 'flex-end', marginTop: 10, marginRight: 20 }} name="ios-arrow-forward" />
                            </View>
                        </TouchableOpacity>

                    </View>


                    <ActionButton buttonColor="rgba(31, 135, 84,1)" renderIcon={() => { return <Icon style={{ fontSize: 20, color: 'white' }} name="md-create" /> }} >




                    </ActionButton>
                </View>
            </View>
        )
    }

    componentDidMount() {
        const { navigation } = this.props;
        const item = navigation.getParam('item', null);
        this.setState({
            contactitem: item,
            imageurl: item.imglink != "" ? { uri: server.getServerIp()+'http://192.168.1.170/React/avatar/up/' + item.imglink } : require('../img/defaultavatar.jpg')
        })


    }

    style = StyleSheet.create({
        body: {
            flex: 1
        },
        ct1: {

            flex: 50
        },
        ct2: {
            paddingTop: 30,
            backgroundColor: '#F2F4F4',
            flex: 50,

        },
        phoneitem: {
            marginTop: 5,
            backgroundColor: 'white',
            height: 50,
            flexDirection: 'row',
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 10


        }


    });

}
