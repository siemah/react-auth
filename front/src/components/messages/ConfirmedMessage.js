import React from 'react';
import { Message } from 'semantic-ui-react'

const ConfirmedMessage = () => {
  return (
    <Message info>
      <Message.Header>
        Please confirm your account by checking you email to reach all features of app ;)
      </Message.Header>
    </Message>
  )
}

export default ConfirmedMessage;