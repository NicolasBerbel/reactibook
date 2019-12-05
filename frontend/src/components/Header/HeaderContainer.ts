import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Header from './Header';
import { ApplicationState, logout } from '../../store';

const mapStateToProps = ( { auth } : ApplicationState) => ({
  token: auth.token,
});

const mapDispatchToProps = (dispatch : Dispatch) => {
  return bindActionCreators({
    logout: logout.request
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

