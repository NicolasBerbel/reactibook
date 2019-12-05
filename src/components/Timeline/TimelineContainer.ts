import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Timeline from './Timeline';
import { ApplicationState, fetchPosts } from '../../store';

const mapStateToProps = ( { posts } : ApplicationState) => ({
  loading: posts.loading,
  error: posts.error,
  posts: posts.data,
});

const mapDispatchToProps = (dispatch : Dispatch) => {
  return bindActionCreators({
    fetchPosts: fetchPosts.request
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);

