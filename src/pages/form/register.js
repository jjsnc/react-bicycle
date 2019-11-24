import React, { Component } from 'react'

import { Form, Input } from 'antd'


class FormRegister extends Component {
    constructor(props) {
        super(props)
        this.state = { loading: true }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="horizontal">
                <Form.Item>
                    {
                        getFieldDecorator('userName', {
                            initialValue: '',
                            rules: [
                                {
                                    required: true,
                                    message: '用户名不能为空'
                                }
                            ]

                        })(
                            <Input placeholder='请输入用户名'/>
                        )
                    }
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create()(FormRegister)