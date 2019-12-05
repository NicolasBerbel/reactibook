import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Post from './Post';
import { ApplicationState, deletePost, updatePost } from '../../store';

const mapStateToProps = ( { auth, posts } : ApplicationState) => ({
  user: auth.user,
  loading: posts.loading,
  error: posts.error,
  posts: posts.data,
});

const mapDispatchToProps = (dispatch : Dispatch) => {
  return bindActionCreators({
    deletePost: deletePost.request,
    updatePost: updatePost.request,
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);

