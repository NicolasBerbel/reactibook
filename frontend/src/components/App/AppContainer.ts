import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import App from './App';
import { ApplicationState, logout, getAuthUser } from '../../store';

const mapStateToProps = ( { auth } : ApplicationState) => ({
  user: auth.user,
  token: auth.token,
});

const mapDispatchToProps = (dispatch : Dispatch) => {
  return bindActionCreators({
    getAuthUser: getAuthUser.request,
    logout: logout.request
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

