/*
* @Author: jjsnc
* @Date:   2019-11-18 08:48:43
* @Last Modified by:   jjsnc
* @Last Modified time: 2019-11-18 12:02:15
*/

import React, { Component } from 'react'
import { Menu } from 'antd';
import MenuConfig from '../../config/menuConfig'
import { NavLink } from 'react-router-dom'
import './index.less'
import { connect } from 'react-redux'
import { switchMenu } from './../../redux/action'
const { SubMenu } = Menu;


class NavLeft extends Component {
	// 菜单渲染
	constructor(props) {
		super(props)
		this.state = {
			'menuTreeNode': "",
			currentKey: ''

		}
	}
	handleClick = (item, key) => {
		//   let currentKey = window.location.hash.replace(/#|\?.*$/g,'')
		let { item: currentItem, key: currentKey } = item
		if (key === this.state.currentKey) {
			return false;
		}
		// 事件派发，自动调用reducer，通过reducer保存到store对象中
		const { dispatch } = this.props;
		dispatch(switchMenu(currentItem.node.title));
		this.setState({
			currentKey: currentKey
		});
		// hashHistory.push(key);
	}
	render() {
		return (
			<div>
				<NavLink to="/home" onClick={this.homeHandleClick}>
					<div className="logo">
						<img src="/assets/logo-ant.svg" alt="" />
						<h1 style={{ display: "inline-block" }}>Admin MS</h1>
					</div>
				</NavLink>
				<Menu selectedKeys={[this.state.currentKey]} theme="dark" mode="vertical" onClick={this.handleClick}>
					{this.state.menuTreeNode}
				</Menu>
			</div>
		)
	}
	renderMenu = (data) => {
		return data.map((item) => {
			if (item.children) {
				return <SubMenu key={item.key} title={item.title}>
					{this.renderMenu(item.children)}
				</SubMenu>
			}
			return <Menu.Item title={item.title} key={item.key}>
				<NavLink to={item.key}>{item.title}</NavLink>
			</Menu.Item>
		})
	}
	componentDidMount() {
		const menuTreeNode = this.renderMenu(MenuConfig)
		this.setState({
			menuTreeNode
		})
	}

}

export default connect()(NavLeft)