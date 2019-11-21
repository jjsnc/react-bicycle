/*
* @Author: jjsnc
* @Date:   2019-11-18 08:47:16
* @Last Modified by:   jjsnc
* @Last Modified time: 2019-11-18 09:03:02
*/

import React, { Component } from 'react'
// import { Row, Col } from 'antd';
import Util from '../../utils/utils'
import './index.less'
console.log(Util, 'Util')

export default class Header extends Component {
	constructor(props) {
		super(props)
		this.state = {
			'userName': 'Damon',
			'sysTime': ''
		}
	}
	componentDidMount() {
		this.getNowDate()
	}
	// 实时获取系统时间
	getNowDate = () => {
		setInterval(() => {
			let sysTime = Util.formateDate(Date.now())
			this.setState({
				sysTime
			})
		}, 1000)
	}
	render() {
		return (
			<div> {this.state.sysTime}
			</div>
		)
	}
}