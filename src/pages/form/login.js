import React, { Component } from 'react'

import { Form, Input, Button, Icon, Checkbox } from 'antd';




class HorizontalLoginForm extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form layout='inline'>
                    <Form.Item>
                        <Input placeholder='请输入用户名'></Input>
                    </Form.Item>
                    <Form.Item>
                        <Input placeholder='请输入密码'></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary'>登录</Button>
                    </Form.Item>
                </Form>
                <br />
                <Form layout='horizontal' style={{ width: '300px' }}>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            initialValue: '', rules: [
                                {
                                    required: true,
                                    message: '请输入你的用户名!'
                                },
                                {
                                    min: 5, max: 10,
                                    message: '长度不在范围内'
                                },
                                {
                                    pattern: new RegExp('^\\w+$', 'g'),
                                    message: '用户名必须为字母或者数字'
                                }
                            ],
                        })(<Input prefix={<Icon type="user" />} placeholder='请输入用户名'></Input>)
                        }
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            initialValue: '', rules: [{ required: true, message: '请输入你的密码' }],
                        })(<Input prefix={<Icon type="lock" />} type="password" placeholder='请输入用户名'></Input>)
                        }
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName:'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住密码</Checkbox>
                        )}
                        <span  style={{ float: 'right' }}>忘记密码</span>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={this.handleSubmit}>Log in</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
}

const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);
export default WrappedHorizontalLoginForm