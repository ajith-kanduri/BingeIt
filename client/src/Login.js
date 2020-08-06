import React from 'react';
import { Form, Input, Button } from 'antd';
import './Login.css';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

class Login extends React.Component {
  onFinish = values => {
    console.log('Success:', values);
    var username = values.username;
    var password = values.password;

    const userAction = async () => {
      const response = await fetch(
        'http://c227cbb6beba.ngrok.io/auth/login?email=' +
          username +
          '&password=' +
          password,
        {
          method: 'POST', // string or object
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const myJson = await response.json(); //extract JSON from the http response
      // do something with myJson
      console.log(myJson);
      if (myJson.code === 200) {
        this.props.stateChange();
      }
    };
    userAction();
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <div className='login-box'>
          <Form
            name='normal_login'
            className='login-form'
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name='username'
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='Username'
              />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className='site-form-item-icon' />}
                type='password'
                placeholder='Password'
              />
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className='login-form-button'
              >
                Log in
              </Button>
            </Form.Item>
            <Form.Item>
              <a className='login-form-forgot' href=''>
                Create an account
              </a>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
