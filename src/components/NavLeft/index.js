/*
* @Author: jjsnc
* @Date:   2019-11-18 08:48:43
* @Last Modified by:   jjsnc
* @Last Modified time: 2019-11-18 12:02:15
*/

import React,{Component} from 'react'
import { Menu, Icon } from 'antd';
import MenuConfig from '../../config/menuConfig'
import './index.less'
console.log(MenuConfig,'MenuConfig')
const { SubMenu } = Menu;
function handleClick(e) {
  console.log('click', e);
}

export default class NavLfet extends Component{
	render(){
		return (
            <div>
                 <div className="logo">
                        <img src="/assets/logo-ant.svg" alt=""/>
                        <h1>Admin MS</h1>
                  </div>
            	  <Menu onClick={handleClick} theme="dark"  mode="vertical">
				    <SubMenu
				      key="sub1"
				      title={
				        <span>
				          <Icon type="mail" />
				          <span>Navigation One</span>
				        </span>
				      }
				     >
				      <Menu.Item key="1">Option 1</Menu.Item>
				      <Menu.Item key="2">Option 2</Menu.Item>
				    </SubMenu>
				    <SubMenu
				      key="sub2"
				      title={
				        <span>
				          <Icon type="appstore" />
				          <span>Navigation Two</span>
				        </span>
				      }
				    >
				      <Menu.Item key="5">Option 5</Menu.Item>
				      <Menu.Item key="6">Option 6</Menu.Item>
				    </SubMenu>
				  </Menu>
            </div>
			)
	}
}