import { combineReducers, compose, createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import posts, { PostsState } from './posts'
import media, { MediaState } from './media'
import auth, { AuthState } from './auth'
import rootSaga from './rootSaga';

export interface ApplicationState {
  posts: PostsState,
  auth: AuthState,
  media: MediaState
};

const rootReducer = combineReducers<ApplicationState>({
  posts,
  auth,
  media,
});

const sagaMiddleware = createSagaMiddleware();

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store: Store<ApplicationState> = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export default store;
export * from './posts';
export * from './auth';
export * from './media';
