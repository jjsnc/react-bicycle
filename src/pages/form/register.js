import React, { Component } from 'react'

import { Form, Input, Radio, InputNumber, Select, Switch, DatePicker, TimePicker, Upload, Icon, Button, Checkbox } from 'antd'
import moment from 'moment'

const formItemLayout = {
    labelCol: {
        xs: 24,
        sm: 4
    },
    wrapperCol: {
        xs: 24,
        sm: 12
    }
}

const offsetLayout = {
    wrapperCol:{
        xs:24,
        sm:{
            span:12,
            offset:4
        }
    }
}
const rowObject = {
    minRows: 4, maxRows: 6
}

function onChange(date, dateString) {
    console.log(date.format("YYYY-MM-DD"),dateString,'6666');
  }

class FormRegister extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            userImg: '',
            fileList: [
                {
                    uid: '-1',
                    name: 'xxx.png',
                    status: 'done',
                    url: 'http://www.baidu.com/xxx.png',
                },
            ],
            fileProps: {
                action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
                onChange: this.handleChange,
                multiple: true,
            },
            checked: false
        }
    }
    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        console.log(userInfo.birthday.value,'userInfo.birthday')
    }

    handleChange = info => {
        let fileList = [...info.fileList];

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-2);

        // 2. Read from response and show file link
        fileList = fileList.map(file => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });
        this.setState({ fileList });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="horizontal">
                <Form.Item label="用户名" {...formItemLayout}>
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
                            <Input placeholder="请输入用户名" />
                        )
                    }
                </Form.Item>
                <Form.Item label="密码" {...formItemLayout}>
                    {
                        getFieldDecorator('userPwd', {
                            initialValue: ''
                        })(
                            <Input type="password" placeholder="请输入密码" />
                        )
                    }
                </Form.Item>
                <Form.Item label="性别" {...formItemLayout}>
                    {
                        getFieldDecorator('sex', {
                            initialValue: '1'
                        })(
                            <Radio.Group>
                                <Radio value="1" >男</Radio>
                                <Radio value="2" >女</Radio>
                            </Radio.Group>
                        )
                    }
                </Form.Item>
                <Form.Item label="年龄" {...formItemLayout}>
                    {
                        getFieldDecorator('age', {
                            initialValue: 18
                        })(
                            <InputNumber />
                        )
                    }
                </Form.Item>
                <Form.Item label="当前状态" {...formItemLayout}>
                    {
                        getFieldDecorator('state', {
                            initialValue: "2"
                        })(
                            <Select>
                                <Select.Option value="1">咸鱼一条</Select.Option>
                                <Select.Option value="2">风华浪子</Select.Option>
                                <Select.Option value="3">北大才子一枚</Select.Option>
                                <Select.Option value="4">百度FE</Select.Option>
                                <Select.Option value="5">创业者</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label="爱好" {...formItemLayout}>
                    {
                        getFieldDecorator('interest', {
                            initialValue: ['2', '5']
                        })(
                            <Select mode="multiple">
                                <Select.Option value="1">游泳</Select.Option>
                                <Select.Option value="2">打篮球</Select.Option>
                                <Select.Option value="3">踢足球</Select.Option>
                                <Select.Option value="4">跑步</Select.Option>
                                <Select.Option value="5">爬山</Select.Option>
                                <Select.Option value="6">骑行</Select.Option>
                                <Select.Option value="7">桌球</Select.Option>
                                <Select.Option value="8">麦霸</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label="是否已婚" {...formItemLayout}>
                    {
                        getFieldDecorator('isMarried', {
                            valuePropName: 'checked',
                            initialValue: true
                        })(
                            <Switch />
                        )
                    }
                </Form.Item>
                <Form.Item label="生日" {...formItemLayout}>
                    {
                        getFieldDecorator('birthday', {
                            initialValue: moment('2016-06-16')
                        })(
                            <DatePicker
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                onChange={onChange}
                            />
                        )
                    }
                </Form.Item>
                <Form.Item label="联系地址" {...formItemLayout}>
                    {
                        getFieldDecorator('address', {
                            initialValue: '上海浦东新区金桥'
                        })(
                            <Input.TextArea
                                autoSize={rowObject}
                            />
                        )
                    }
                </Form.Item>
                <Form.Item label="早起时间" {...formItemLayout}>
                    {
                        getFieldDecorator('time')(
                            <TimePicker />
                        )
                    }
                </Form.Item>
                <Form.Item label="头像" {...formItemLayout}>
                    {
                        getFieldDecorator('userImg')(
                            <Upload
                                {...this.state.fileProps}
                                fileList={this.state.fileList}
                            >
                                <Button> <Icon type="upload" /> Upload</Button>
                            </Upload>
                        )
                    }
                </Form.Item>
                <Form.Item {...offsetLayout} >
                    {
                        getFieldDecorator('agreement',{
                            valuePropName: 'checked',
                            initialValue: true
                        })(
                            <Checkbox >Checkbox</Checkbox>
                        )
                    }
                </Form.Item>
                <Form.Item  {...offsetLayout}>
                    <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create()(FormRegister)