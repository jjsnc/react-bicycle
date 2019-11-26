import React, { Component } from 'react';
import Utils from '../../utils/utils'
// import axios from './../../axios/index';
import axios from 'axios';
import { Card, Button, Table, Form, Modal, message } from 'antd'
import BaseForm from '../../components/BaseForm'
const FormItem = Form.Item;
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
            page: 1,
            orderInfo: {},
            orderConfirmVisble: false,
            selectedRowKeys: []
        }
    }
    formList = [
        {
            type: 'SELECT',
            label: '城市',
            field: 'city',
            placeholder: '全部',
            initialValue: '1',
            key: '001',
            width: 80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }]
        },
        {
            type: '时间查询',
            key: '002',
        }
        ,
        {
            type: 'SELECT',
            label: '订单状态',
            field: 'order_status',
            key: '003',
            placeholder: '全部',
            initialValue: '1',
            width: 80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' }]
        }
    ]
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
    handleFilter = (params) => {
        this.params = params;
        this.requestList();
    }
    requestList = () => {
        let _this = this;
        axios.get('/api/order/list.json', {
            page: this.state.page
        }).then((res) => {
            var data = res.data
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
    // 订单结束确认
    handleConfirm = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请选择一条订单进行结束'
            })
            return;
        }
        axios.get('/api/order/ebike_info.json', {
            orderId: item.id
        }).then((res) => {
            let data = res.data
            if (data.code === 0 || data.code === "0") {
                this.setState({
                    orderInfo: data.result,
                    orderConfirmVisble: true
                })
            }
        })
    }

    // 结束订单
    handleFinishOrder = () => {
        let item = this.state.selectedItem;
        axios.get('/api/order/finish_order.json', {
            orderId: item.id
        }).then((res) => {
            let data = res.data
            if (data.code === 0 || data.code === "0") {
                message.success('订单结束成功')
                this.setState({
                    orderConfirmVisble: false
                })
                this.requestList();
            }
        })
    }
    // 订单详情
    openOrderDetail = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请先选择一条订单'
            })
            return;
        }
        window.open(`/#/common/order/detail/${item.id}`, '_blank')
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
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }

        return (
            <div>
                <Card>
                    <BaseForm  formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" onClick={this.handleConfirm}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                }
                            };
                        }}
                    />
                </div>
                <Modal
                    title="结束订单"
                    visible={this.state.orderConfirmVisble}
                    onCancel={() => {
                        this.setState({
                            orderConfirmVisble: false
                        })
                    }}
                    onOk={this.handleFinishOrder}
                    width={600}
                >
                    <Form layout="horizontal">
                        <FormItem label="车辆编号" {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="剩余电量" {...formItemLayout}>
                            {this.state.orderInfo.battery + '%'}
                        </FormItem>
                        <FormItem label="行程开始时间" {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置" {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}



// class FilterForm extends React.Component {

//     render() {
//         const { getFieldDecorator } = this.props.form;
//         return (
//             <Form layout="inline">
//                 <FormItem label="城市">
//                     {
//                         getFieldDecorator('city_id')(
//                             <Select
//                                 style={{ width: 100 }}
//                                 placeholder="全部"
//                             >
//                                 <Option value="">全部</Option>
//                                 <Option value="1">北京市</Option>
//                                 <Option value="2">天津市</Option>
//                                 <Option value="3">深圳市</Option>
//                             </Select>
//                         )
//                     }
//                 </FormItem>
//                 <FormItem label="订单时间">
//                     {
//                         getFieldDecorator('start_time')(
//                             <DatePicker />
//                         )
//                     }
//                 </FormItem>
//                 <FormItem>
//                     {
//                         getFieldDecorator('end_time')(
//                             <DatePicker />
//                         )
//                     }
//                 </FormItem>
//                 <FormItem label="订单状态">
//                     {
//                         getFieldDecorator('op_mode')(
//                             <Select
//                                 style={{ width: 80 }}
//                                 placeholder="全部"
//                             >
//                                 <Option value="">全部</Option>
//                                 <Option value="1">进行中</Option>
//                                 <Option value="2">结束</Option>
//                             </Select>
//                         )
//                     }
//                 </FormItem>
//                 <FormItem>
//                     <Button type="primary" style={{ margin: '0 20px' }}>查询</Button>
//                     <Button>重置</Button>
//                 </FormItem>
//             </Form>
//         );
//     }
// }
// FilterForm = Form.create({})(FilterForm);
