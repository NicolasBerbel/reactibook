import { combineReducers, compose, createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import posts, { PostsState } from './posts'
import auth, { AuthState } from './auth'
import rootSaga from './rootSaga';

const rootReducer = combineReducers({
  posts,
  auth,
});

export interface ApplicationState {
  posts: PostsState,
  auth: AuthState,
};

const sagaMiddleware = createSagaMiddleware();

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store: Store<ApplicationState> = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export default store;
export * from './posts';
export * from './auth';
