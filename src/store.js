import { createStore } from 'redux';
import rootReducer from './Reducers/ProductReducers';

const store = createStore(rootReducer);

export default store;
