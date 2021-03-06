import { Col, Form, Icon, Input, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import logo from 'Assets/login.logo.svg';
import Button from 'Components/Button';
import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { u } from 'Services/user';
import {
  MSG_BAD_USERNAME,
  MSG_REQUIRE_PASSWORD,
  MSG_REQUIRE_USERNAME,
} from 'Services/user/default.msg';
// utils
import usernameValidator from 'Utils/username.validator';
import styles from './styles.module.css';

class LoginPage extends Component<
  FormComponentProps & RouteComponentProps,
  {
    loading: boolean;
  }
> {
  state = {
    loading: false,
  };

  componentDidMount = async () => {
    console.log(u.GetUser());
    if (u.GetUser()) await u.UserLogout();
  };

  onValidator = (_rule: any, value: string, callback: any) => {
    if (value.length === 0) return callback();
    const valid = usernameValidator(value);

    if (!valid) return callback(MSG_BAD_USERNAME);
    return callback();
  };

  onSubmit = async (e: any) => {
    e.preventDefault();
    const { validateFields, setFields } = this.props.form;
    return validateFields(
      (err, values: { username: string; password: string }) => {
        if (!err) {
          return this.setState({ loading: true }, async () => {
            const { username, password } = values;
            const { auth, msg } = await u.RequestorLogin(
              username,
              password,
            );

            if (auth) return this.props.history.push('/');
            setFields({
              password: {
                value: values.password,
                errors: [new Error(msg)],
              },
            });
            return this.setState({ loading: false });
          });
        }
      },
    );
  };

  onType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.id;
    return this.props.form.setFields({
      [key]: {
        error: undefined,
      },
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;
    return (
      <React.Fragment>
        <div style={{ height: '150px' }} />
        <Row type="flex" justify="center">
          <Col>
            <img src={logo} alt="logo" />
            <p className={styles.label}>BOOK MY SPACE</p>
          </Col>
        </Row>
        <div style={{ height: '40px' }} />
        <Form onSubmit={this.onSubmit} autoComplete="on">
          <Row type="flex" justify="center">
            <Col span={18} lg={14} className={styles.input}>
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [
                    { required: true, message: MSG_REQUIRE_USERNAME },
                    {
                      validator: this.onValidator,
                    },
                  ],
                  validateTrigger: ['onBlur'],
                })(
                  <Input
                    onChange={this.onType}
                    placeholder="Username"
                    name="username"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={18} lg={14} className={styles.input}>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [
                    { required: true, message: MSG_REQUIRE_PASSWORD },
                  ],
                  validateTrigger: ['onBlur'],
                })(
                  <Input
                    onChange={this.onType}
                    placeholder="Password"
                    type="password"
                    name="current-password"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={18} lg={14}>
              <Button>
                {loading ? <Icon type="loading" /> : 'Login'}
              </Button>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    );
  }
}

const wrapped = Form.create()(LoginPage);
export default withRouter<RouteComponentProps, any>(wrapped);
