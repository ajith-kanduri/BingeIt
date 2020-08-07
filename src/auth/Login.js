import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from 'react';
import { useHistory ,withRouter} from "react-router-dom";
import '../App.css'
import { Redirect } from 'react-router-dom';


const API_ADDR = 'http://1d8c951668ad.ngrok.io' 



const Login = () => {


  const history = useHistory();

  const onRegister = () =>
    history.push('/register');
  

  console.log('----');
  console.log(history);
  console.log('----');
  const onFinish = values => {
    console.log('Success:', values);
    var username = values.username;
    var password = values.password;

    const userAction = async () => {
      const response = await fetch(
        API_ADDR+'/auth/login?email=' +
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
      if (myJson.code == 200) {

        console.log("history");
        history.push('/dash',{email:username});
        console.log(history);

      }
    };
    userAction();
  };


  return (
      <div className="login">
          <img className="logo" src={require("../images/logo.png")}/>
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item className="LoginRegister-button">
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
         <a onClick={()=>this.onRegister()} className="register-form-button">Register Now</a>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Login;