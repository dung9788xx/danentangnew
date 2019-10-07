import React, { Component } from 'react';
export default class ServerConfig{
    server="http://192.168.1.170";
    constructor(){

    }
    getServerIp(){
        return this.server
    }
}