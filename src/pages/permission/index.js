import React, { Component } from 'react'

import { Card, Button } from 'antd';
import axios from 'axios'
import ETable from '../../components/ETable/index'
import Utils from '../../utils/utils'


// var Mock = require('mockjs')
// var data = Mock.mock({
//     "code": 0,
//     "result": {
//         "page": 1,
//         "page_size": 10,
//         "total_count": 25,
//         "page_count": 3,
//         "item_list|7": [{
//             "id|+1": 1,
//             "role_name": /(管理人员)|(客服专员)|(财务专员)|(市场专员)|(人力专员)|(研发)|(测试)|(系统管理员)/,
//             "status|0-1": 1,
//             "authorize_user_name": "@cname",
//             "authorize_time": 1521270166000,
//             "create_time": 1499305790000,
//             "menus": ["/home", "/ui/buttons", "/ui/modals", "/ui/loadings", "/ui/notification", "/ui/messages", "/ui/tabs", "/ui/gallery", "/ui/carousel", "/ui"]
//         }]
//     }
// })
// // 输出结果
// console.log(JSON.stringify(data, null, 4))








export default class Permission extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRowKeys: [],
            selectedItem: '',
            selectedIds: '',
            list: []
        }
    }
    handleRole = () => {
        console.log('创建角色')
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
            </div>
        )
    }
}