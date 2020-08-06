import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Layout} from 'antd'
import {Switch,Route, BrowserRouter, Router} from 'react-router-dom'
import {useHistory, createHistory} from 'react-router-dom'

import Login from './auth/Login'
import TabComponent from './dash/TabComponent'
import Register from './auth/Register';

const {Header,Footer,Content} = Layout;

const API_ADDR = 'http://74d47a6c12e2.ngrok.io' 

function App() {


  return (
    <Layout className="app">
      <Header className="header"></Header>
      <Content className="content">
        <BrowserRouter>
          <div>
          <Switch>
          
            <Route className="login" exact path="/" component={Login}/>
            <Route exact path="/dash" component={TabComponent}/>
            <Route exact path='/register' component={Register}/>
            
          </Switch>
          </div>
        </BrowserRouter>
          
        
      </Content>
    <Footer className="footer">bingeit 2020</Footer>
    </Layout>
  );
}

export default App;
