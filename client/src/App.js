import React from 'react';
import { Button } from 'antd';
import './App.css';
import TabComponent from './components/TabComponent';
import {Layout} from 'antd'

const {Header,Footer,Content} = Layout;

const App = () => (
  <div className='App'>
    <Layout>
    <Header className="header">BingeIt</Header>
    <Content className="content">
      <TabComponent/>
      </Content>
      <Footer>bingeit 2020</Footer>
      </Layout>
  </div>
);

export default App;
