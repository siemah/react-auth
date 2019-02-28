import React, { Component } from 'react'
import { Message, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { confirm } from '../../actions/user';

class ConfirmationPage extends Component {

  state = {
    loading: true,
    success: false,
  }

  componentDidMount = () => {
    // send a request to backend for account validation
    this.props.confirm(this.props.match.params.token)
      .then((res) => {
        this.setState({ success: true, loading: false })
      }).catch((err) => {
        this.setState({ success: false, loading: false })  
      });
  }

  render() {
    let { loading, success } = this.state;
    return ( 
      <div>
        {
          loading && <Message icon>
            <Icon name="circle notched" loading />
            <Message.Header>Validating your email</Message.Header>
          </Message>
        }
        {
          !loading && success && <Message icon>
            <Icon name="checkmark" />
            <Message.Header>Your account has been Validated</Message.Header>
            <Link to='/dashboard'>Home page</Link>
          </Message>
        }
        {
          !loading && !success && <Message icon>
            <Icon name="close" />
            <Message.Header>Your token is invalide</Message.Header>
          </Message>
        }
      </div>
    )
  }

}

ConfirmationPage.propTypes = {
  confirm: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}


export default connect(null, { confirm })(ConfirmationPage);