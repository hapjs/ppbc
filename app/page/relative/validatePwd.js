'use strict';

import React, { Component } from 'react';
var Core = require("../../core/core");
var $http = require("../../services/services");
var Widget = require('../../widget/widget.js');
// var RelativeTieCard = require("./relativeTieCard");
var keyMap = {};
var skbKey = '';
var commParam = null;
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TextInput,Alert, AlertIOS,
} from 'react-native';
var {
    Password,
    Loading
} = Widget;

//获取安全键盘
var getSKBKey = function( obj, cb ) {
    $http.post({
        url : "clientAPI/newKeyCode",
        data : Object.assign(obj, {'validate':1}),
        success : function( data ) {
            console.info(data);
            cb(data);
        }
    });
};
var resoleKey = function( text, map, cb ) {
    console.info(map);
    var arr = [];
    for( var i = 0; i < text.length; i++ ) {
        var k = text[i];
        arr.push(map[k]);
    }
    cb(arr);
};
var setPasswordData = function( obj, cb ) {
    var pwdData = {
        'password': obj.password,
        'passwordKey': obj.passKey,
        'validate': '1'
    };
    $http.post({
        url: 'clientAPI/validPayPassword',
        data: Object.assign(pwdData, commParam),
        success: function (data) {
            cb(data);
        }
    });
};
var ValidatePwd = React.createClass({
    getInitialState : function() {
        return {
            password : null,
            passKey : null,
            passMap : null
        }
    },
    _init : function() {
        var _this = this;
        _this.refs.password.setState({
            password: ''
        });
        getSKBKey(commParam, function( data ){
            _this.setState({
                passKey : data.key,
                passMap : data.encodeMap
            });
        });
    },
    _forgetPassword : function() {

    },
    onInputPassword : function( text ) {
        console.info(text);
        var navigator = this.props.navigator;
        var _this = this;
        if( text.length == 6 ) {
            _this.refs.loading.show();
            var map = this.state.passMap;
            resoleKey( text, map, function( arr ){
                _this.setState({
                    password : arr
                });
            });
            var obj = this.state;
            setPasswordData(obj, function( data ){
                _this.refs.loading.hide();
                console.info(data);
                // remove Alert, then load next page
                if (data.code == 1) {
                    console.info("validatePwd success!");
                    //idCardExist:1为 未实名，但该身份证已在信通宝平台注册过 ；0为 未实名，该身份证没有在信通宝平台注册过
                    //realName:1为 已实名 ；0为 未实名
                    Core.nextPage("RelativeTieCardPage", {
                        commParam : commParam
                    }, navigator);
                } else {
                    Alert.alert('温馨提示',
                    data.message,
                    [
                      {text: '确定', onPress: () => _this._init()}
                    ]);
                }
            });
        }
    },
    componentDidMount : function() {
        commParam = this.props.commParam;
        var _this = this;
        getSKBKey(commParam, function( data ){
            _this.setState({
                passKey : data.key,
                passMap : data.encodeMap
            });
        });
    },
    render : function() {
        return(
            <ScrollView style={{backgroundColor:"#E6E9EB"}}>
                <Loading ref='loading'></Loading>
                <View style={{flex:1}}>
                    <View style={{flexDirection:'column'}}>
                        <View style={{flex:1,alignSelf: 'stretch',justifyContent: 'center', alignItems:'center',marginTop:40}}>
                            <Text>请输入您的交易密码，以验证身份</Text>
                        </View>
                    </View>
                    <View style={{flex:1,flexDirection:'row', alignSelf: 'stretch',justifyContent: 'center', alignItems:'center', marginTop:40}}>
                        <Password ref="password"
                          onChange={this.onInputPassword}/>
                    </View>
                </View>
            </ScrollView>
        )
    }
});

module.exports = ValidatePwd;
