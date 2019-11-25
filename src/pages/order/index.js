import React, { Component } from 'react';
import Utils from '../../utils/utils'
// import axios from './../../axios/index';
import axios from 'axios';
import { Card, Button, Table, Form, Select, DatePicker } from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;

// 使用 Mock
// var Mock = require('mockjs')
// var data = Mock.mock({
    
//         "code": '0',
//         "result": {
//           "page|1-9": 1,
//           "page_size": 10,
//           "total_count": 85,
//           "page_count": 9,
//           "item_list|10": [{
//             "id": 2959165,
//             "order_sn": /T180[0-9]{6}/,
//             "bike_sn": "800116090",
//             "user_id": 908352,
//             "user_name": "@cname",
//             "mobile": /1[0-9]{10}/,
//             "distance": 2000,
//             "total_time": 4000,
//             "status|1-2": 1,
//             "start_time": "@datetime",
//             "end_time": "@datetime",
//             "total_fee": 1000,
//             "user_pay": 300
//           }]
//         }
      
// })
// // 输出结果
// console.log(JSON.stringify(data, null, 4))

export default class Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1
        }
    }
    onRowClick = (record, index) => {
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }
    componentDidMount() {
        this.requestList()
    }
    requestList = () => {
        let _this = this;
        axios.get('/api/order/list.json',{
            page: this.state.page
        }).then((res) => {
            var data  = res.data
            let list = data.result.item_list.map((item, index) => {
                item.key = index;
                return item;
            });
            this.setState({
                list,
                pagination: Utils.pagination(data, (current) => {
                    _this.state.page = current;
                    _this.requestList();
                })
            })
        })
    }
    render() {
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance) {
                    return distance / 1000 + 'Km';
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ]
        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card>
                    <Button> 订单详情</Button>
                    <Button> 结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                }
                            };
                        }}
                    />
                </div>
            </div>
        )
    }
}



class FilterForm extends React.Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator('city_id')(
                            <Select
                                style={{ width: 100 }}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                                <Option value="3">深圳市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="订单时间">
                    {
                        getFieldDecorator('start_time')(
                            <DatePicker />
                        )
                    }
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('end_time')(
                            <DatePicker />
                        )
                    }
                </FormItem>
                <FormItem label="订单状态">
                    {
                        getFieldDecorator('op_mode')(
                            <Select
                                style={{ width: 80 }}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">进行中</Option>
                                <Option value="2">结束</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{ margin: '0 20px' }}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        );
    }
}
FilterForm = Form.create({})(FilterForm);
