import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { ApplicationState, login } from '../../store';

const mapStateToProps = ( { auth } : ApplicationState) => ({
  loading: auth.loading,
  error: auth.error,
  passwordError: auth.passwordError,
  usernameError: auth.usernameError,
});

const mapDispatchToProps = (dispatch : Dispatch) => {
  return bindActionCreators({
    login: login.request
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
