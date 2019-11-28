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
// import { NavLink } from 'react-router-dom'
const { SubMenu } = Menu;


export default class NavLfet extends Component {
	// 菜单渲染
	constructor(props) {
		super(props)
		this.state = {
			'menuTreeNode': ""
		}
	}
	handleClick=(item, key)=>{
    //    console.log(item, key, 'item key')
	}
	render() {
		return (
			<div>
				<div className="logo">
					<h1>Admin MS</h1>
				</div>
				<Menu theme="dark" mode="vertical" onClick={this.handleClick}>
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