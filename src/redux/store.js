
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { reducer } from  './reducers';

export default function initStore() {
    const store = createStore(
        reducer,
      applyMiddleware(thunk)
    );
    return store;
}