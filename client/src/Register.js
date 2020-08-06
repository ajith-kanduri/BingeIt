import React from 'react';
import { Layout, Tabs, Form, Input, Button, Checkbox } from 'antd';
import './Login.css';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

class Login extends React.Component {
  onFinish = values => {
    console.log('Success:', values);
    if (values.password.length < 6) {
      console.log('Enter Password of Minimum Lenght 6');
    } else if (values.password != values.confirmpassword) {
      console.log('Passwords Doesnt Match');
    } else {
      var username = values.username;
      var password = values.password;
      const userAction = async () => {
        const response = await fetch(
          'http://c227cbb6beba.ngrok.io/auth/register?email=' +
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
        if (myJson.serverStatus === 2) {
          this.props.stateChange();
        }
      };
      userAction();
    }
  };

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
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
            <Form.Item
              name='confirmpassword'
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
                placeholder='Confirm Password'
              />
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className='login-form-button'
              >
                Sign Up
              </Button>
            </Form.Item>
            <Form.Item>
              <p>Already Have an Account? </p>
              <a className='login-form-forgot' href=''>
                Login
              </a>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
