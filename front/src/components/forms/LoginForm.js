import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import Validator from 'validator';
import PropTypes from 'prop-types';

import InlineError from '../messages/InlineError';

export default class LoginForm extends Component {
  
  state = {
    data: {
      email: '',
      password: '',
    },
    loading: false,
    errors: {},
  }

  onChange = ({ target }) => this.setState(prevState => ({
      ...prevState,
      data: { 
        ...prevState.data,
        [target.name]: target.value
      }
    }))

  onSubmit = e => {
    let { data } = this.state;
    let errors = this.validate(data);
    this.setState({errors});
    if( Object.keys(errors).length === 0 ) {
      this.setState({ loading: true, });
      this.props
        .submit(this.state.data)
        .catch(err =>{
          console.log("error", err.message)
          this.setState({ errors: err.response.data.errors, loading: false })
        }
        );
    } 
  }

  validate = data => {
    let errors = {};
    if (!Validator.isEmail(data.email)) errors.email = 'Invalid email';
    if(!data.password.trim()) errors.password = 'Can\'t be blank';
    return errors;
  }

  render() {
    let { data, errors, loading } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {
          errors.global && <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{ errors.global }</p>
          </Message>
        }
        <Form.Field error={!!errors.email}>
          <label htmlFor='email'>Email</label>
          <input 
            type='email' 
            name='email' 
            id='email' 
            defaultValue={data.email}
            placeholder='email@website.domain' 
            onChange={this.onChange} />
          {errors.email && <InlineError message={errors.email} />}
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            defaultValue={data.password}
            placeholder='secure password'
            onChange={this.onChange} />
          {errors.password && <InlineError message={errors.password} />}
        </Form.Field>
        <Button primary>Login</Button>
      </Form>
    )
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
}