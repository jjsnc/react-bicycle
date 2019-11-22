import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './Admin'
import Home from './pages/home';
import Buttons from './pages/ui/buttons'
// import Modals from './pages/ui/modals'
import NoMatch from './pages/nomatch'
// import Loadings from './pages/ui/loadings'
// import Notice from './pages/ui/notice'
// import Messages from './pages/ui/messages'
// import Tabs from './pages/ui/tabs'
// import Gallery from './pages/ui/gallery'
// import Carousel from './pages/ui/carousel'
// import FormLogin from './pages/form/login'
// import FormRegister from './pages/form/register'
// import BasicTable from './pages/table/basicTable'
// import HighTable from './pages/table/highTable'
// import Rich from './pages/rich'
// import City from './pages/city/index'
// import Order from './pages/order/index'
// import Common from './common'
// import OrderDetail from './pages/order/detail'
// import BikeMap from './pages/map/bikeMap'
// import User from './pages/user/index'
// import Bar from './pages/echarts/bar/index'
// import Pie from './pages/echarts/pie/index'
// import Line from './pages/echarts/line/index'
// import Permission from './pages/permission'
// import renderEmpty from 'antd/lib/config-provider/renderEmpty'

export default class ERouter extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path='/login' component={Login}></Route>
                        <Route path="/" render={()=>
                            <Admin>
                                <Switch>
                                    <Route path='/home' component={Home} />
                                    <Route path="/ui/buttons" component={Buttons} />
                                    <Route path="/ui/buttons" component={Buttons} />
                                    <Redirect to="/home" />
                                    <Route component={NoMatch} />
                                </Switch>
                            </Admin>         
                        } />
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}