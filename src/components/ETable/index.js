import React, { Component } from 'react'

// import Utils from './../../utils/utils'

import { Table } from 'antd'

export default class ETable extends Component {
    onSelectChange(record, index) {
        // this.props.updateSelectedItem(record, index)
    }
    onRowClick = (record, index) => {
        let { rowSelection, updateSelectedItem, selectedRowKeys, selectedIds, selectedItem } = this.props
        if (rowSelection === 'checkbox') {
            selectedItem = selectedItem || []
            if (selectedIds) {
                const i = selectedIds.indexOf(record.id);
                if (i === -1) {
                    selectedRowKeys.push(index);
                    selectedIds.push(record.id)
                    selectedItem.push(record);
                } else {
                    selectedRowKeys.splice(i, 1);
                    selectedIds.splice(i, 1);
                    selectedItem.splice(i, 1);
                }
            } else {
                selectedIds = [record.id];
                selectedRowKeys = [index]
                selectedItem = [record];
            }
            updateSelectedItem(selectedRowKeys, selectedItem, selectedIds)
        } else {
            let selectedRowKeys = [index]
            let selectedItem = record
            updateSelectedItem(selectedRowKeys, selectedItem)
        }

    }
    tableInit = () => {
        const { columns, dataSource, pagination, rowSelection: row_selection, selectedRowKeys } = this.props

        let rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: this.onSelectChange
        }
        if (row_selection === false || row_selection === null) {
            rowSelection = false
        } else {
            rowSelection.type = row_selection
        }

        return (
            <Table
                bordered
                columns={columns}
                dataSource={dataSource}
                pagination={pagination}
                rowSelection={rowSelection}
                onRow={(record, index) => {
                    return {
                        onClick: () => {
                            if (row_selection) {
                                this.onRowClick(record, index);
                            }
                        }
                    };
                }}
            />
        )
    }
    render() {

        return (
            <div>
                {this.tableInit()}
            </div>
        )
    }
}