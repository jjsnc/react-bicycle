/*
* @Author: jjsnc
* @Date:   2019-11-18 08:46:03
* @Last Modified by:   jjsnc
* @Last Modified time: 2019-11-18 09:46:25
*/

import React ,{ Component}from 'react';
import { Row, Col } from 'antd';
import Header from './components/Header'
import NavLeft from './components/NavLeft'
import Footer from './components/Footer'
 import './style/common.less' 
export default class Admin extends  Component{
   render(){
   	return (
        <div>
		  <Row className="container">
		      <Col span={4} className="nav-left" >
                  <NavLeft />
		      </Col>
		      <Col span={20} className="main">
                 <Header>
                 	这是头部
                 </Header>
                 <Row className="content">
                 	这是中间
                 	 {/*this.props.children */}
                 </Row>
                 <Footer>
                 	这是底部
                 </Footer>
		      </Col>
		    </Row>
        </div>
   		)
   }
}