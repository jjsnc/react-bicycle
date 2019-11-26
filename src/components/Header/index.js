/*
* @Author: jjsnc
* @Date:   2019-11-18 08:47:16
* @Last Modified by:   jjsnc
* @Last Modified time: 2019-11-18 09:03:02
*/

import React, { Component } from 'react'
import { Row, Col } from 'antd';
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
			'weather': '',
			'timer': ''
		}
	}
	componentDidMount() {
		this.getNowDate()
		this.getWeatherAPIData()
	}
	// 实时获取系统时间
	getNowDate = () => {
		let timer = setInterval(() => {
			let sysTime = Util.formateDate(Date.now())
			this.setState({
				sysTime
			})
		}, 1000)
		this.setState({
			timer
		})
	}
	componentWillUnmount() {
		clearTimeout(this.state.timer)
	}
	// 获取天气的API
	getWeatherAPIData() {
		let city = '上海';
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
		const { menuName, menuType } = this.props;
		return (
			<div className="header">
				<Row className="header-top">
					{
						menuType ?
							<Col span={6} className="logo">
								<img src="/assets/logo-ant.svg" alt="" />
								<span>IMooc 通用管理系统</span>
							</Col> : ''
					}
					<Col span={menuType ? 18 : 24}>
						<span>欢迎，{this.state.userName}</span>
						<a href="#">退出</a>
					</Col>
				</Row>
				{
					menuType ? '' :
						<Row className="breadcrumb">
							<Col span={4} className="breadcrumb-title">
								{menuName || '首页'}
							</Col>
							<Col span={20} className="weather">
								<span className="date">{this.state.sysTime}</span>
								<span className="weather-img">
									<img src={this.state.dayPictureUrl} alt="" />
								</span>
								<span className="weather-detail">
									{this.state.weather}
								</span>
							</Col>
						</Row>
				}
			</div>
		)
	}
}