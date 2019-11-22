/*
* @Author: jjsnc
* @Date:   2019-11-18 08:48:43
* @Last Modified by:   jjsnc
* @Last Modified time: 2019-11-18 12:02:15
*/

import React, { Component } from 'react'
import { Menu } from 'antd';
import MenuConfig from '../../config/menuConfig'
import './index.less'
import { NavLink } from 'react-router-dom'
const { SubMenu } = Menu;


export default class NavLfet extends Component {
	// 菜单渲染
	constructor(props) {
		super(props)
		this.state = {
			'menuTreeNode': ""
		}
	}
	render() {
		return (
			<div>
				<div className="logo">
					<h1>Admin MS</h1>
				</div>
				<Menu theme="dark" mode="vertical">
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
			return <SubMenu key={item.key} title={item.title}></SubMenu>
		})
	}
	componentDidMount() {
		const menuTreeNode = this.renderMenu(MenuConfig)
		this.setState({
			menuTreeNode
		})
	}

}