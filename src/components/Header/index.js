/*
* @Author: jjsnc
* @Date:   2019-11-18 08:47:16
* @Last Modified by:   jjsnc
* @Last Modified time: 2019-11-18 09:03:02
*/

import React, { Component } from 'react'
// import { Row, Col } from 'antd';
import Util from '../../utils/utils'
import axios from '../../axios'
import './index.less'
export default class Header extends Component {
	constructor(props) {
		super(props)
		this.state = {
			'userName': 'Damon',
			'sysTime': '',
			'dayPictureUrl': '',
			'weather': ''
		}
	}
	componentDidMount() {
		this.getNowDate()
		this.getWeatherAPIData()
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
	// 获取天气的API
	getWeatherAPIData() {
		let city = '北京';
		axios.jsonp({
			url: 'http://api.map.baidu.com/telematics/v3/weather?location=' + encodeURIComponent(city) + '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
		}).then((res) => {
			if (res.status === 'success') {
				let data = res.results[0].weather_data[0];
				this.setState({
					dayPictureUrl: data.dayPictureUrl,
					weather: data.weather
				})
			}
		})
	}
	render() {
		return (
			<div> {this.state.sysTime}
			</div>
		)
	}
}