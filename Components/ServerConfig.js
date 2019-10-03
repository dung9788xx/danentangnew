import React, { Component } from 'react';
export default class ServerConfig{
    server="http://123.123.123.123";
    constructor(){

    }
    getServerIp(){
        return this.server
    }
}