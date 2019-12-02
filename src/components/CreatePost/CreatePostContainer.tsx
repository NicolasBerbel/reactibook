import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import CreatePost from './CreatePost';
import { ApplicationState, createPost } from '../../store';

const mapStateToProps = ( { posts } : ApplicationState) => ({
  loading: posts.loading,
  error: posts.error,
  posts: posts.data,
});

const mapDispatchToProps = (dispatch : Dispatch) => {
  return bindActionCreators({
    createPost: createPost.request
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePost);

