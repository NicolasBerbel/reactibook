import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import CreatePost from './CreatePost';
import { ApplicationState, createPost, uploadMedia, clearUploadedMedias } from '../../store';

const mapStateToProps = ( { posts, media } : ApplicationState) => ({
  loading: posts.loading,
  error: posts.error,
  mediaUploadError: media.error,
  mediaUploadLoading: media.loading,
  uploadedMedias: media.uploadedMedias,
  uploadingMedias: media.loading,
});

const mapDispatchToProps = (dispatch : Dispatch) => {
  return bindActionCreators({
    clearUploadedMedias,
    createPost: createPost.request,
    uploadMedia: uploadMedia.request,
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePost);

