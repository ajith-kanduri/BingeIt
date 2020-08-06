import React from 'react';
import { Layout, Tabs, Form, Input, Button, Checkbox } from 'antd';
import { logo } from './images/logo.png';
import './App.css';

import Login from './Login';
import Register from './Register';
import Main from './Main';
const { Header, Content, Footer } = Layout;
const TabPane = { Tabs };

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
    };
    this.stateChange = this.stateChange.bind(this);
  }
  stateChange = () => {
    this.setState({ isLoggedIn: true });
  };
  render() {
    return this.state.isLoggedIn ? (
      <Layout className='App'>
        <Header className='header'>
          <img className='logo-header' src={require('./images/logo.png')} />
        </Header>
        <Content className='content'>
          <Main />
        </Content>
        <Footer></Footer>
      </Layout>
    ) : (
      <div className='App'>
        <Header className='header'>
          <img className='logo-header' src={require('./images/logo.png')} />
        </Header>
        <Content className='content'>
          {/* <Register stateChange={this.stateChange} /> */}
          <Login stateChange={this.stateChange} />
        </Content>
      </div>
    );
  }
}

export default App;
