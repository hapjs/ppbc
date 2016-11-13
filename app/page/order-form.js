'use strict';

import React, { Component } from 'react';

import RN, {
    StyleSheet,
    View,
    Text, Alert, AlertIOS,
} from 'react-native';

// 用于mixin，简化导航方法的调用
// 让页面具有 this.props.navigator 上的方法，如 this.push 等
import NavMinin from '../core/nav-mixin.js';

import Widget, {
  Style,
  SelectButton,
  Button,
  alert,
  Form
} from '../widget/widget.js'

var layout = React.createClass({

    mixins: [NavMinin],

    // 跳转到
    go: function(name){
        return function(){
        this.push(name);
        }.bind(this);
    },

    submit: function () {
        var form = this.refs.form;
        var err = form.getError();
        if (err) {
            Alert.alert(err);
        } else {
            Alert.alert('验证成功');
        };
    },

    getInitialState: function () {
        var self = this;

        return {
            name: '',
            price: '',
            form: {

                'name': {
                    label: '品名',
                    type: 'TextInput',
                    props: {
                        maxLength: 20,
                        placeholder: '请输入产品名称',
                        value: '',
                        onChange: function (text) {
                            self.setState({
                                name: text
                            });
                        }
                    }
                },

                'price': {
                    label: '金额',
                    type: 'TextInput',
                    props: {
                        maxLength: 8,
                        placeholder: '请输入订单金额',
                        value: '',
                        onChange: function (text) {
                            self.setState({
                                price: text
                            });
                        }
                    }
                },

            }
        };
    },

    render: function () {
        return (
            <View style={Style.mix('page', 'flex')}>
                <RN.ScrollView>
                    <View>
                        <Form ref="form" children={this.state.form} ref="form" />
                        <Button text="下一步" ref="btnNext" onPress={this.go('order-scan')} />
                    </View>
                </RN.ScrollView>
            </View>
        );
    }
});

// styles
var styles = StyleSheet.create({

});

module.exports = layout;