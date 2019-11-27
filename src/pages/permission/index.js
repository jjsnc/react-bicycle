import React, { Component } from 'react'

import { Card, Button, Modal, Form, Select, Input } from 'antd';
import axios from 'axios'
import ETable from '../../components/ETable/index'
import Utils from '../../utils/utils'
const FormItem = Form.Item;
const Option = Select.Option;

export default class Permission extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRowKeys: [],
            selectedItem: '',
            selectedIds: '',
            list: [],
            isRoleVisible: false
        }
    }
    handleRole = () => {
        console.log('创建角色')
        this.setState({
            isRoleVisible: true
        })
    }
    handlePermission = () => {
        console.log('设置权限')

    }
    handleUserAuth = () => {
        console.log('用户授权')
    }
    componentDidMount() {
        this.requestList()
    }
    requestList = () => {
        axios.get('/api/role/list.json', {
            params: {
                page: 1
            }
        }).then((res) => {
            let data = res.data
            if (data.code === 0) {
                let list = data.result.item_list.map((item, i) => {
                    item.key = i;
                    return item;
                })
                this.setState({
                    list
                })
            }
        })
    }
    handleRoleSubmit = () => {
        console.log('handleRoleSubmit')
        let data = this.roleForm.props.form.getFieldsValue();
        axios.get('/api/role/create.json', {
            params: {
                ...data
            }
        }).then((res) => {
            console.log(res,'res')
            if (res) {
                this.setState({
                    isRoleVisible: false
                })
                this.requestList();
            }
        })
    }
    render() {
        const columns = [
            {
                title: '角色ID',
                dataIndex: 'id'
            }, {
                title: '角色名称',
                dataIndex: 'role_name'
            }, {
                title: '创建时间',
                dataIndex: 'create_time',
                render: Utils.formatTime
            }, {
                title: '使用状态',
                dataIndex: 'status',
                render(status) {
                    if (status === 1) {
                        return "启用"
                    } else {
                        return "停用"
                    }
                }
            }, {
                title: '授权时间',
                dataIndex: 'authorize_time',
                render: Utils.formatTime
            }, {
                title: '授权人',
                dataIndex: 'authorize_user_name',
            }
        ];
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleRole}>创建角色</Button>
                    <Button type="primary" onClick={this.handlePermission}>设置权限</Button>
                    <Button type="primary" onClick={this.handleUserAuth}>用户授权</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedIds={this.state.selectedIds}
                        selectedItem={this.state.selectedItem}
                        dataSource={this.state.list}
                        rowSelection={"checkbox"}
                        columns={columns}
                    />
                </div>
                <Modal
                    title="创建角色"
                    visible={this.state.isRoleVisible}
                    onOk={this.handleRoleSubmit}
                    onCancel={() => {
                        this.roleForm.props.form.resetFields();
                        this.setState({
                            isRoleVisible: false
                        })
                    }}
                >
                    <RoleForm wrappedComponentRef={(inst) => this.roleForm = inst} />
                </Modal>
            </div>
        )
    }
}





// 角色创建
class RoleForm extends React.Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 }
        };
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator('role_name', {
                            initialValue: ''
                        })(
                            <Input type="text" placeholder="请输入角色名称" />
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('state', {
                            initialValue: 1
                        })(
                            <Select>
                                <Option value={1}>开启</Option>
                                <Option value={0}>关闭</Option>
                            </Select>
                        )}
                </FormItem>
            </Form>
        );
    }
}
RoleForm = Form.create({})(RoleForm);
