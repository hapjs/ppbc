'use strict';

import React, { Component } from 'react';

import RN, {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  NavigatorIOS,
  ScrollView,
  Alert, 
  AlertIOS,
} from 'react-native';

import OrderForm from './order-form.js'

// 引用所有页面的引用
var Layouts = require('../core/components.js').pages || {};

// 用于mixin，简化导航方法的调用
// 让页面具有 this.props.navigator 上的方法，如 this.push 等
var NavMinin = require('../core/nav-mixin.js');

var Widget = require('../widget/widget.js');

var {
  Style,
  SelectButton,
  Button,
  alert,
  BankList
} = Widget;

var Layout = React.createClass({

  mixins: [NavMinin],

  // 跳转到
  go: function(name){
    return function(){
      this.push(name);
    }.bind(this);
  },

  create: function(){
    this.go('order-form');
  },

  render: function(){
    var self = this;
    
    return (
        <View style={[Style.mix('page', 'flex'), styles.container]}>
            <Button style={[styles.loginButton]}
              onPress={this.create}>创建订单</Button>
        </View>
    );
  }
});

var nav = React.createClass({

  render: function(){

    var bar = (<View style={[styles.bar]}></View>);
    var self = this;

    return (
      <Widget.Navigator
        style={[Style.mix('flex'), styles.navigator]}
        components={Layouts}
        initialRoute={{
          title: '收单',
          component: Layout
        }} />
    );

  }
  
});

// styles
var styles = StyleSheet.create({
  container: {
    marginTop: 40,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  navigator: {
    flexDirection: 'column',
    marginBottom: 50
  },
  bar: {
    height:40,
    top: 0,
    backgroundColor:'red'
  },
  header: {
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: '#E84F1E',
    alignItems: 'center', 
    justifyContent: 'center'
  },
  username: {
    color: '#FFF',
  },
  loginButton: {
    borderWidth: Style.realPixel,
    backgroundColor: '#E84F1E',
    borderColor: '#FFF',
    borderRadius: 5,
    width: 120,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  list: {
    marginBottom: 50
  },
  item: {
    backgroundColor: 'blue',
    height: 60,
  }
});

module.exports = nav;