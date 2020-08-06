import React from 'react';

import './App.css';
import TabComponent from './components/TabComponent';
import { Layout } from 'antd';

const { Header, Footer, Content } = Layout;

const App = () => (
  <div className='App'>
    <Layout>
      <Content className='content'>
        <TabComponent />
      </Content>
      <Footer>Bingeit 2020</Footer>
    </Layout>
  </div>
);

export default App;
