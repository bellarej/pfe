import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const middleware = [thunk];

const resetEnhancer = (rootReducer) => (state, action) => {
       if (action.type !== 'USER_LOGOUT') return rootReducer(state, action);

       const newState = rootReducer(undefined, {});
       newState.router = state.router;
       return newState;
};
const store = createStore(resetEnhancer(rootReducer), initialState, composeWithDevTools(applyMiddleware(...middleware)));
export default store;
