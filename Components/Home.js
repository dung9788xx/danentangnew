import React, { Component } from 'react';
import { ToastAndroid, AsyncStorage, Alert, StyleSheet, TouchableOpacity, TextInput, Image, View, Text, FlatList } from 'react-native';
import ActionButton, { ActionButtonItem } from 'react-native-action-button';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/Ionicons';
import ServerConfig from './ServerConfig'
import ModalDropdown from 'react-native-modal-dropdown';
export default class Home extends Component {
    constructor() {
        super()
        server = new ServerConfig()
        this.state = {
            arrayholder: [],
            text: "",
            data: [],
            iduser: null
        }
        this.gotoDetail = this.gotoDetail.bind(this);
    }

    deleteContact(item) {
        fetch(server.getServerIp() + '/React/delete.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: item.id

            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson == "1") {
                    this.getData(this.state.iduser)
                    ToastAndroid.show('Xóa thành công', ToastAndroid.LONG);
                } else {
                    ToastAndroid.show('Xảy ra lỗi vui lòng thử lại', ToastAndroid.SHORT);
                }

            })
            .catch((error) => {
                ToastAndroid.show('Xảy ra lỗi vui lòng thử lại', ToastAndroid.SHORT);
            });
    }
    SearchFilterFunction(text) {
        const newData = this.state.arrayholder.filter(function (item) {
            const itemData = item.ten ? item.ten.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });

        this.setState({
            data: newData,
            text: text,
        });
    }
    renderavatar(item) {
        if (item.isavatar == "1") {
            return (<Image

                style={{ width: 50, height: 50, alignSelf: 'center', marginLeft: 20, borderRadius: 25, overflow: 'hidden' }} source={{ uri: server.getServerIp() + '/React/avatar/up/' + item.imglink + '?time' + (new Date()).getTime() }} />
            )
        } else return (<Image

            style={{ width: 50, height: 50, alignSelf: 'center', marginLeft: 20 }} source={require("../img/user.png")} />
        )
    }
    Item(item) {
        let swipeoutBtns = [
            {
                text: 'Xóa',
                onPress: () => {
                    Alert.alert(
                        '',
                        'Xóa liên hệ này ?',
                        [
                            { text: 'Thoát', style: 'cancel' },
                            { text: 'Xóa', onPress: () => this.deleteContact(item) },
                        ],
                        { cancelable: false }
                    )
                },
                type: 'delete',
                underlayColor: 'blue'
            }
        ]
        return (
            <Swipeout
                autoClose={true}
                style={{ flex: 1, backgroundColor: 'white', }} right={swipeoutBtns}>
                <View style={{ flexDirection: 'row', flex: 1, height: 70, borderBottomWidth: 1, borderBottomColor: '#D5D8DC' }} >
                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} onPress={() => this.gotoDetail(item)}>

                        {this.renderavatar(item)}
                        <Text style={{ alignSelf: 'center', marginLeft: 10, fontSize: 18 }}> {item.ten}</Text>
                    </TouchableOpacity>

                </View>
            </Swipeout>

        );
    }
    gotoDetail(item) {

        this.props.navigation.push('ContactDetail', { item: item })
    }
    getData(iduser) {
        fetch(server.getServerIp() + '/React/getList.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: iduser

            }),
        }).then((response) => response.json())
            .then((responseJson) => {

                this.setState(
                    () => {
                        return {
                            arrayholder: responseJson,
                            data: responseJson
                        }
                    }
                )

            })
            .catch((error) => {
                console.warn(error);
            });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>

                <View style={{ height: 70, borderBottomWidth: 1, flexDirection: 'row', borderBottomColor: '#D5D8DC' }}>
                    <View style={{ flex: 11 }}>
                        <Text style={{ flex: 1, alignSelf: 'center', justifyContent: 'center', marginTop: 20, fontSize: 20 }}>Liên hệ</Text>
                    </View>

                    <ModalDropdown
                        dropdownStyle={{ height: 100 }}
                        dropdownTextStyle={{ fontSize: 20 }}
                        onSelect={(id) => {
                            if (id == 0) {
                                alert("gt")
                            }
                            if (id == 1) {
                                this.props.navigation.navigate('Login')
                            }

                        }}
                        style={{ flex: 1, alignSelf: 'center', width: 150 }} options={['Giớ thiệu', 'Đăng xuất']}>
                        <Icon style={{ fontSize: 30, alignSelf: 'center' }} name="md-more" />
                    </ModalDropdown>
                </View>
                <View style={this.style.input}>
                    <Icon style={{ alignSelf: 'center' }} name="ios-search" size={20} color="#000" />
                    <TextInput
                        style={{ flex: 1, marginLeft: 5 }}
                        onChangeText={text => this.SearchFilterFunction(text)}
                        value={this.state.text}

                        underlineColorAndroid="transparent"
                        placeholder="Tìm kiếm"
                    />
                </View>

                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => this.Item(item)}
                    keyExtractor={item => item.id}
                />
                <ActionButton buttonColor="rgba(2,117,216,1)" onPress={
                    () => this.props.navigation.navigate('AddContact', { iduser: this.state.iduser })
                } >

                </ActionButton>
            </View>
        );
    }
    componentDidMount() {
        const { navigation } = this.props;
        const id = navigation.getParam('iduser', '');
        if (id != "") {
            try {
                AsyncStorage.setItem('iduser', id);
                this.setState({
                    iduser: id
                })
                this.getData(id)
            } catch (error) {
                alert(error)
            }
        } else {
            try {
                AsyncStorage.getItem('iduser').then(
                    (value) => {
                        this.setState({
                            iduser: value
                        })
                        this.getData(value)
                    }
                );

            } catch (error) {
                alert(error)
            }

        }


    }
    style = StyleSheet.create({
        input: {
            flexDirection: 'row',
            margin: 6,
            paddingLeft: 25,
            borderRadius: 7,
            backgroundColor: '#D5D8DC',
            borderBottomColor: '#D5D8DC'
        }
    })
}